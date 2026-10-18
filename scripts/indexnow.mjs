/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver - and the
 * products built on Bing's index) that pages are new or changed, so they are
 * crawled in days rather than weeks. Google does not use IndexNow; it reads the
 * sitemap submitted in Search Console instead.
 *
 * Run AFTER a deploy is live, since engines fetch the pages straight away:
 *
 *   npm run indexnow                      every URL in the live sitemap
 *   npm run indexnow -- /blog/new-post/   only the listed paths (preferred
 *                                         for routine updates: IndexNow asks
 *                                         for changed URLs, not the whole site)
 *
 * The key is public by design: the engines confirm ownership by fetching
 * public/<key>.txt from the site and checking it contains the key.
 */

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.viorahosting.com").replace(/\/$/, "");
const KEY = "9d92fe4a37d9444ad04ef4f221ebfa60";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

async function sitemapUrls() {
  const response = await fetch(`${SITE}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml returned ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const paths = process.argv.slice(2);
const urlList = paths.length
  ? paths.map((path) => new URL(path, `${SITE}/`).href)
  : await sitemapUrls();

const keyCheck = await fetch(KEY_LOCATION);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file not live at ${KEY_LOCATION} - deploy first, then re-run.`);
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = accepted, 202 = accepted and key validation pending. Anything else is a failure.
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URL(s)`);
if (response.status !== 200 && response.status !== 202) {
  console.error(await response.text());
  process.exit(1);
}
