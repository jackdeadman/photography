import db from '$lib/database';

const siteUrl = 'https://photos.jackdeadman.com';

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title><![CDATA[Photos by Jack Deadman]]></title>
    <description><![CDATA[Personal website show casing photos taken by Jack Deadman in a mini-blog style.]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>SvelteKit</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.name}]]></title>
      <description><![CDATA[
            ${post.description}
            <img src="${post.versions.med_jpg}" alt="${post.alt}" />
        ]]>
        
        </description>
      <link>${siteUrl}/photo/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/photo/${post.slug}</guid>
      <pubDate>${post.published || '"Sat, 31 Jul 2021 12:00:00 GMT"'}</pubDate>
    </item>
    `,
      )
      .join('\n')}
  </channel>
</rss>`;

export async function get() {
  const feed = renderXmlRssFeed(await db.photos());

  return {
    body: feed,
  };
}