import humps from 'humps'
import { fuzzyDateTime } from '~/mixins/helpers'

const transformArticle = function (data) {
  const transformedData = humps.camelizeKeys(data)
  transformedData.authors = transformedData.relatedAuthors.map(author => ({
    firstName: author.firstName,
    lastName: author.lastName,
    url: author.slug && `/staff/${author.slug}`,
    organization: author.contributingOrganization?.name,
    organizationUrl: author.contributingOrganization?.url
  }))
  transformedData.formattedPublishDate = fuzzyDateTime(data.publicationDate)
  if (data.updatedDate) {
    transformedData.formattedUpdatedDate = fuzzyDateTime(data.updatedDate)
  }
  return transformedData
}

const coronavirusStatistics = transformArticle({
  id: 142990,
  meta: {
    first_published_at: '2020-03-28T22:17:21.839954Z',
    type: 'news.ArticlePage',
    detail_url: 'https://cms.prod.nypr.digital/api/v2/pages/142990/',
    html_url: 'http://cms.prod.nypr.digital/news/coronavirus-statistics-tracking-epidemic-new-york/',
    slug: 'coronavirus-statistics-tracking-epidemic-new-york',
    show_in_menus: true,
    seo_title: 'Coronavirus Statistics: Tracking The Epidemic In NYC',
    search_description: 'Graphs charting the coronavirus in New York State and New York City.',
    parent: {
      id: 4,
      meta: {
        type: 'standardpages.IndexPage',
        detail_url: 'https://cms.prod.nypr.digital/api/v2/pages/4/',
        html_url: 'http://cms.prod.nypr.digital/news/'
      },
      title: 'News'
    }
  },
  title: 'Coronavirus Statistics: Tracking The Epidemic In New York',
  listing_title: '',
  listing_summary: '',
  listing_image: {
    id: 327482,
    title: 'pW8V6-covid-case-rate-per-100k-new-yorkers-by-vaccination-status-for-header-img-only- (2).png',
    width: 2880,
    height: 2080,
    created_at: '2021-12-03T22:21:29.718526Z',
    focal_point_x: null,
    focal_point_y: null,
    focal_point_width: null,
    focal_point_height: null,
    file_size: 247974,
    file_hash: '44f23c95a0a87f389966c38e7533e4c274668a23',
    alt: 'A chart showing COVID-19 case rate among vaccinated and unvaccinated New Yorkers. The case rate for unvaccinated people is consistently higher.',
    caption: 'A chart showing COVID-19 case rate among vaccinated and unvaccinated New Yorkers.',
    credit: 'Jaclyn Jeffrey-Wilensky',
    credit_link: '',
    file: 'https://cdn.cms.prod.nypr.digital/original_images/pW8V6-covid-case-rate-per-100k-new-yorkers-by-vaccination-status-for-heade_TuJwwaf.png',
    usage_limitations: '',
    expiry_date: null,
    collection: 1,
    uploaded_by_user: 115
  },
  social_image: {
    id: 327482,
    title: 'pW8V6-covid-case-rate-per-100k-new-yorkers-by-vaccination-status-for-header-img-only- (2).png',
    width: 2880,
    height: 2080,
    created_at: '2021-12-03T22:21:29.718526Z',
    focal_point_x: null,
    focal_point_y: null,
    focal_point_width: null,
    focal_point_height: null,
    file_size: 247974,
    file_hash: '44f23c95a0a87f389966c38e7533e4c274668a23',
    alt: 'A chart showing COVID-19 case rate among vaccinated and unvaccinated New Yorkers. The case rate for unvaccinated people is consistently higher.',
    caption: 'A chart showing COVID-19 case rate among vaccinated and unvaccinated New Yorkers.',
    credit: 'Jaclyn Jeffrey-Wilensky',
    credit_link: '',
    file: 'https://cdn.cms.prod.nypr.digital/original_images/pW8V6-covid-case-rate-per-100k-new-yorkers-by-vaccination-status-for-heade_TuJwwaf.png',
    usage_limitations: '',
    expiry_date: null,
    collection: 1,
    uploaded_by_user: 115
  },
  social_title: '',
  social_text: '',
  show_on_index_listing: true,
  uuid: '538202da-8628-4465-b234-37df29d7a67c',
  url: 'https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york',
  canonical_url: '',
  publication_date: '2021-12-03T20:30:00Z',
  updated_date: '2021-12-03T20:30:00Z',
  description: 'These charts show the growth of COVID-19 in New York City and the tri-state area.',
  lead_asset: [
    {
      type: 'lead_image',
      value: {
        image: {
          id: 327481,
          title: '51565193393_1c37428dd5_o.jpg',
          width: 4096,
          height: 3515,
          created_at: '2021-12-03T22:17:08.803977Z',
          focal_point_x: null,
          focal_point_y: null,
          focal_point_width: null,
          focal_point_height: null,
          file_size: 14586313,
          file_hash: 'a8916d0955369a54ddcd6efb22bf8218a83f90eb',
          alt: 'An electron micrograph showing blue cells and green virus particles.',
          caption: 'Colorized scanning electron micrograph of chronically infected and partially lysed cells (blue) infected with a variant strain of SARS-CoV-2 virus particles (green), isolated from a patient sample. Image captured at the NIAID Integrated Research Facility (IRF) in Fort Detrick, Maryland.',
          credit: 'NIAID',
          credit_link: 'https://www.flickr.com/photos/niaid/51565193393/in/album-72157712914621487/',
          file: 'https://cdn.cms.prod.nypr.digital/original_images/51565193393_1c37428dd5_o.jpg',
          usage_limitations: '',
          expiry_date: null,
          collection: 1,
          uploaded_by_user: 115
        },
        caption: '',
        image_link: ''
      },
      id: 'f9b1886d-90a6-4a14-ab71-5e8c2e775a24'
    }
  ],
  body: [
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Latest COVID Data In New York" aria-label="table" id="datawrapper-chart-oMq8p" src="https://datawrapper.dwcdn.net/oMq8p/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="311"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'cd55d94c-9dc9-44f6-8f19-d9ac4a0bc563'
    },
    {
      type: 'paragraph',
      value: '<p>Since the early days of the pandemic, the WNYC/Gothamist newsroom has used data to shape our <a href="https://gothamist.com/tags/covid-19" rel="noopener" target="_blank">COVID-19</a> <a href="https://gothamist.com/tags/covid-19-updates" rel="noopener" target="_blank">coverage</a>. We’ve revamped our COVID-19 statistics page to focus on the metrics that matter most during the pandemic’s second year: vaccines, variants and recent trends in New York City.</p><p>WNYC/Gothamist commends the tremendous effort that Jake Dobkin, Clarisa Diaz and Zach Gottehrer-Cohen put into maintaining this stats page over its first 16 months.</p><p>Also check out our COVID tracker for NYC schools <a href="https://gothamist.com/news/coronavirus-statistics-back-school-edition-tracking-outbreaks-nyc-education" rel="noopener" target="_blank">here</a>. Data on both pages updates every day, but we update the text and publication date about once a week.</p><p>Want different metrics on this page? Please send any questions or comments to <a href="mailto:SciHealthData@wnyc.org">SciHealthData@wnyc.org</a>.</p>',
      id: 'c6f258af-c4f5-4f93-b87b-f4253f7dbd96'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<div style="border: 2px dashed #afafaf; padding: 24px 16px;">\n<h2 class="o-section__heading o-bg-text-accent">Menu</h2>\n<p style="margin-bottom:16px; margin-top:16px;"><a href="https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york#Anchor1">Recent Trends</a></p>\n<p style="margin-bottom:16px; margin-top:16px;"><a href="https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york#Anchor2">Vaccinations</a></p>\n<p style="margin-bottom:16px;"><a href="https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york#Anchor3">Variants</a></p>\n<p style="margin-bottom:16px;"><a href="https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york#Anchor4">NYC Pandemic Over Time</a>\n</p>\n<p style="margin-bottom:16px;"><a href="https://gothamist.com/news/coronavirus-statistics-tracking-epidemic-new-york#Anchor5">COVID-19 Pandemic In New York, New Jersey And Connecticut</a>\n</p>\n</div>'
      },
      id: 'a9c89e9f-2b7d-4b1a-a88b-9ee0e9fe8f2a'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<a id="Anchor1" style="display: block; position: relative; top: -250px; visibility: hidden;">Recent Trends</a>'
      },
      id: '75a49378-801a-4be2-8302-e419c7a57ffc'
    },
    {
      type: 'paragraph',
      value: '<h2><b>Recent Trends</b></h2>',
      id: '5911eaaa-01d8-4bd0-a518-666c09f2ced0'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Recent Positivity Rate in New York City" aria-label="Interactive line chart" id="datawrapper-chart-Vf7eh" src="https://datawrapper.dwcdn.net/Vf7eh/24/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="450"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'dfca7f5e-e21d-4fa7-a97f-a8748da42e35'
    },
    {
      type: 'paragraph',
      value: '<p>These charts portray New York City’s primary COVID statistics over the last 90 days. After reaching a valley in June, the positivity rate rose throughout the rest of the summer, driven by the delta variant. The city marked its <a href="https://gothamist.com/news/nyc-passes-1-million-covid-cases" rel="noopener" target="_blank">millionth COVID case</a> on August 14th. Transmission declined through September and October but has climbed again in recent weeks.</p>',
      id: 'd2f0dda8-a354-4c9e-8703-6f7c9e9e06a9'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="ZIP Codes By Positivity Over Last 7 Days" aria-label="Map" id="datawrapper-chart-0zJaa" src="https://datawrapper.dwcdn.net/0zJaa/18/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="781"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: '4c75e63c-bdff-4476-b463-db654f2c607b'
    },
    {
      type: 'paragraph',
      value: '<p>This map shows where coronavirus has recently flourished, as judged by the positivity rate. The positivity rate measures how many tests come back showing an infection. High positivity <a href="https://www.jhsph.edu/covid-19/articles/covid-19-testing-understanding-the-percent-positive.html" rel="noopener" target="_blank">can give a sense</a> of where the virus is spreading fastest, but it isn’t the same <a href="https://covidactnow.org/covid-risk-levels-metrics#infection-rate" rel="noopener" target="_blank">as the infection/transmission rate</a>. A high positivity rate—<a href="https://coronavirus.jhu.edu/testing/testing-positivity" rel="noopener" target="_blank">above 5%</a>—can also signal places that have only enough tests to keep pace with severe cases but not mild cases.</p>',
      id: 'ff36e017-2b3d-4b88-8a5b-18987fe4dd09'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Recent COVID-19 Hospitalizations In NYC" aria-label="Map" id="datawrapper-chart-OejKW" src="https://datawrapper.dwcdn.net/OejKW/2/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="838"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'b8169216-4c85-43c3-b068-54e53fa66f57'
    },
    {
      type: 'paragraph',
      value: '<p>This map shows COVID-19 hospitalizations over the last 28 days. Hospitalization rates are higher in parts of the city where fewer people are vaccinated.</p><p>Most of New York City’s data is released on a three-day lag. Data for the most recent days is typically provisional. The department revises the data for older dates as new tallies arrive, so numbers for each date may change slightly over time.</p>',
      id: 'cd77abf3-9107-44d3-ad4d-18de040a13cc'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<a id="Anchor2" style="display: block; position: relative; top: -250px; visibility: hidden;">Vaccinations</a>'
      },
      id: 'ecbd2263-14ea-4164-bd86-c4a1e3e1eada'
    },
    {
      type: 'paragraph',
      value: '<h2><b>Vaccinations</b></h2>',
      id: 'a8c52616-effd-46fd-b6b4-28c0abd21c9e'
    },
    {
      type: 'paragraph',
      value: '<p>Herd immunity occurs when an infectious disease can no longer spread because community protection is high. This target is unknown for COVID-19, but some experts say it could be achieved when <a href="https://www.mayoclinic.org/diseases-conditions/coronavirus/in-depth/herd-immunity-and-coronavirus/art-20486808" rel="noopener" target="_blank">70</a>-<a href="https://health.clevelandclinic.org/how-much-of-the-population-will-need-to-be-vaccinated-until-the-pandemic-is-over/" rel="noopener" target="_blank">85%</a> of a neighborhood, city, state or nation is immune to infection. New York City provides vaccine statistics on the <a href="https://www1.nyc.gov/site/doh/covid/covid-19-data-vaccines.page" rel="noopener" target="_blank">Department of Health and Mental Hygiene</a> website.</p>',
      id: '8e7c469f-6eb1-47b5-b580-a62d8ac844c6'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Vaccination Rate by Neighborhood" aria-label="Map" id="datawrapper-chart-1UMhF" src="https://datawrapper.dwcdn.net/1UMhF/10/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="834"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'aca173e3-4e86-45a7-963a-04bf7bb69315'
    },
    {
      type: 'paragraph',
      value: '<p>New York City’s vaccine campaign started with early hiccups, caused mostly by inclement weather and limited supplies of the Moderna and Pfizer vaccines. Progress was also hampered <a href="https://gothamist.com/news/digital-divide-keeping-many-nyc-seniors-scheduling-covid-19-vaccinations" rel="noopener" target="_blank">by the digital divide and unequal access</a> to the online appointment system for older New Yorkers, whom officials prioritized for the shots. The rollout concentrated in wealthier, less diverse ZIP codes during <a href="https://gothamist.com/news/white-new-yorkers-triple-nyc-covid-19-vaccine-doses" rel="noopener" target="_blank">its early days</a>. Vaccination rates still vary widely among neighborhoods—from less than 50% in parts of Brooklyn to 100% in midtown.</p>',
      id: 'd7bb80d0-c988-4f91-a01d-0308f9734e11'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="New COVID Vaccine Recipients, 7-Day NYC Average" aria-label="Interactive line chart" id="datawrapper-chart-Ch5Oq" src="https://datawrapper.dwcdn.net/Ch5Oq/4/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="649"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'e968a83b-4f72-4358-84a8-eb07870228f4'
    },
    {
      type: 'paragraph',
      value: '<p>Daily shots skyrocketed toward the end of February, also spurred in part by the authorization of the Johnson &amp; Johnson vaccine on February 27th. The number of new takers rose after late March as new eligibility opened up for <a href="https://gothamist.com/news/starting-tuesday-new-yorkers-age-50-will-be-eligible-covid-vaccines" rel="noopener" target="_blank">people older than 50</a>, <a href="https://gothamist.com/news/new-yorkers-over-30-can-get-vaccinated-covid-starting-tuesday" rel="noopener" target="_blank">millennials</a> and then <a href="https://gothamist.com/news/how-score-covid-19-vaccine-appointment-new-york" rel="noopener" target="_blank">anyone over 16 years old</a>. A similar jump occurred after the vaccines were authorized for adolescents <a href="https://gothamist.com/news/fda-authorizes-pfizers-covid-vaccine-for-12-to-15-year-olds-heres-what-ny-parents-should-know" rel="noopener" target="_blank">on May 10th</a>. High demand <a href="https://gothamist.com/news/some-schools-overwhelming-demand-kids-vaccines-first-day-nyc-public-school-vaccine-clinics" rel="noopener" target="_blank">overwhelmed</a> some pop-up vaccine clinics at city schools after the Centers for Disease Control and Prevention authorized the Pfizer-BioNTech vaccine for children between the ages of 5 and 11.</p><p>COVID booster shots are currently available to <a href="https://gothamist.com/news/nyc-says-any-adult-can-now-get-covid-booster-shot" rel="noopener" target="_blank">all fully vaccinated adults</a> in New York City, provided that it’s been two months since their one-dose Johnson and Johnson vaccine or six months since their second Pfizer-BioNTech or Moderna shot. As of December 1st, more than 1 million New Yorkers have received an additional dose of COVID vaccine.</p>',
      id: '60022b9e-f44e-4252-9218-a275302fd8d9'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="New York City Vaccination, All Ages" aria-label="table" id="datawrapper-chart-tJ1Sv" src="https://datawrapper.dwcdn.net/tJ1Sv/6/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="248"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'c3bbfe6d-9ebc-4f64-bc92-c9b8db3634a6'
    },
    {
      type: 'paragraph',
      value: '<p>While city, state and federal officials have provided millions of people with the COVID-19 vaccines, large gaps remain for some key demographics.</p>',
      id: 'bb92f393-b62e-4ae4-9b83-d13df1d9860f'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="New York City Vaccination, Age Groups" aria-label="Grouped Bars" id="datawrapper-chart-h6fgO" src="https://datawrapper.dwcdn.net/h6fgO/11/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="1006"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'e0cd0a5a-f763-4d86-903f-fa7a1c457f96'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="New York City Vaccination, Race/Ethnicity" aria-label="Grouped Bars" id="datawrapper-chart-nvrr3" src="https://datawrapper.dwcdn.net/nvrr3/5/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="578"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'f699b9a2-c367-4eb2-ade0-992201efba9c'
    },
    {
      type: 'paragraph',
      value: '<p>On average, about 83% of New Yorkers over the age of 55 are fully vaccinated. But the oldest New Yorkers are still behind: just 60% of those over age 85 are fully inoculated. Black New Yorkers also remain undervaccinated, while Hispanic New Yorkers’ vaccination rate has surpassed that of white residents.</p><p>According to the latest city data, nearly a third of children ages 5-17 have received at least one dose of COVID-19 vaccine. Kids under 5 years old are currently ineligible, although clinical trials for this age group are in progress.</p><p>New York City experienced a high amount of natural exposure during its first and second waves of the coronavirus. This natural immunity combined with defenses provided by the vaccine rollout to drive down cases, hospitalizations and deaths. Natural and vaccine-based immunity is expected <a href="https://gothamist.com/news/why-the-delta-variant-matters-if-youre-vaccinated-or-unvaccinated" rel="noopener" target="_blank">to last for months, if not years</a>, based on early studies.</p>',
      id: 'b22b2515-f394-49c1-9986-dd93407aa81c'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="COVID Case Rate Per 100K New Yorkers, By Vaccination Status" aria-label="Interactive line chart" id="datawrapper-chart-tsJ2R" src="https://datawrapper.dwcdn.net/tsJ2R/3/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="400"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();</script>'
      },
      id: '56d686f4-bd8b-472d-96d7-3365217ba44d'
    },
    {
      type: 'paragraph',
      value: '<p>But new variants are more likely to evade the natural immunity seen among past recoveries, while vaccine-based shields are more likely to stay intact. Preliminary evidence from South Africa shows the omicron variant <a href="https://gothamist.com/news/nyc-anime-convention-attendee-tests-positive-omicron-variant" rel="noopener" target="_blank">is three times more likely</a> to cause reinfections in unvaccinated people who’ve previously recovered from the virus.</p><p><a href="https://gothamist.com/news/only-1-covid-cases-and-deaths-occurred-fully-vaccinated-new-yorkers-year" rel="noopener" target="_blank">Data released by the city health department</a> shows that fully vaccinated New Yorkers made up just 1% of COVID cases and deaths recorded between January and mid-June.</p>',
      id: '144867e2-49d3-4d38-bc8a-7a96fe13ee3b'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<a id="Anchor3" style="display: block; position: relative; top: -250px; visibility: hidden;">Variants</a>'
      },
      id: 'f6766f49-46f8-45bc-869a-6b966bcbb141'
    },
    {
      type: 'paragraph',
      value: '<h2><b>Variants</b></h2>',
      id: 'f9cb5e3c-6dfc-442b-947b-dc5dac1ba4e8'
    },
    {
      type: 'paragraph',
      value: '<p>Viruses mutate, much like any microorganism or creature with a genome. Coronavirus variants will pose a perpetual threat to unvaccinated people until infection rates are driven to zero.</p>',
      id: '5933ded4-1345-45a8-b3b0-c377db808613'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Percentage of Variants Among New COVID Cases in NYC" aria-label="Interactive area chart" id="datawrapper-chart-Ua41u" src="https://datawrapper.dwcdn.net/Ua41u/24/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="543"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: '83796a63-c7ca-4557-9781-ed873402a329'
    },
    {
      type: 'paragraph',
      value: '<p>The delta variant has dominated in recent months, now accounting for the overwhelming majority of cases sequenced. New York City has also recorded cases of the <a href="https://gothamist.com/news/ny-officials-identify-5-more-omicron-cases-assume-community-spread-ongoing" rel="noopener" target="_blank">B.1.1.529 variant</a>, called “omicron” by the World Health Organization, which has labeled it a “variant of concern.” City officials said they believe the variant is spreading locally.</p><p><a href="https://www.cdc.gov/coronavirus/2019-ncov/science/science-briefs/vaccine-induced-immunity.html" rel="noopener" target="_blank">Research suggests</a> that the COVID-19 vaccines may not be as effective against infections caused by the delta variant, but the drugs can still protect against severe disease, <a href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/booster-shot.html" rel="noopener" target="_blank">especially after boosters</a>. Hospitalizations and deaths are low for people who take a full course of vaccines.</p>',
      id: 'cd74e09a-24b9-49f7-8813-d3d19b797d79'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<a id="Anchor4" style="display: block; position: relative; top: -250px; visibility: hidden;">NYC Pandemic Over Time</a>'
      },
      id: '5b025c2f-99a5-4b08-84b8-fb4f9f41a1be'
    },
    {
      type: 'paragraph',
      value: '<h2><b>NYC Pandemic Over Time</b></h2>',
      id: 'a46c45ef-b07b-4035-be5a-a866106a2d95'
    },
    {
      type: 'paragraph',
      value: '<p>These charts show how cases and hospitalizations evolved throughout every borough and citywide.</p>',
      id: '1bdbbede-c303-4fcd-b7cb-ad7bc736bceb'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Cases By Borough, 7-Day Average" aria-label="Interactive area chart" id="datawrapper-chart-Dr2kf" src="https://datawrapper.dwcdn.net/Dr2kf/9/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="450"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: '4d6558c7-5429-4fc4-9fd1-2fbf90ef447e'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Weekly COVID Case Rates in NYC By Age" aria-label="Interactive line chart" id="datawrapper-chart-cKqIZ" src="https://datawrapper.dwcdn.net/cKqIZ/4/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="400"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();</script>'
      },
      id: 'acc57555-f18b-4e45-9a14-3cdf1001b657'
    },
    {
      type: 'paragraph',
      value: '<p>Since the end of September, elementary school-age children have the highest case rate of any age group in the city.</p>',
      id: '937740c5-cd30-42db-8e0b-7fe261e6542e'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<a id="Anchor5" style="display: block; position: relative; top: -250px; visibility: hidden;">COVID-19 Pandemic In New York, New Jersey And Connecticut</a>'
      },
      id: '0cfe92fc-3fc5-43c2-a437-a918965a21c3'
    },
    {
      type: 'paragraph',
      value: '<h2><b>COVID-19 Pandemic In New York, New Jersey And Connecticut</b></h2>',
      id: 'd690b3c2-3fee-4a2c-bfe1-7f5740863d73'
    },
    {
      type: 'paragraph',
      value: '<p>Parts of New York outside of the five boroughs were hit harder by the state’s second wave relative to its first, a pattern that applied to New Jersey and Connecticut, too. Cases and deaths in all three states decreased dramatically as vaccines became widely available, although the former spiked again over the summer. As of early December, community transmission is “high” or “substantial” throughout the tri-state area, putting the entire region above the CDC’s threshold for universal indoor masking.</p>',
      id: '99633d18-07b3-430d-bd39-6bc5c24903d0'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="CDC Community Transmission Levels in the Tri-State Area, Last 7 Days" aria-label="Map" id="datawrapper-chart-Qt8Tc" src="https://datawrapper.dwcdn.net/Qt8Tc/19/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="828"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: '88dcd5e4-83f9-44d6-9f43-e2bdb0e05c59'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Tri-State Cases" aria-label="Interactive area chart" id="datawrapper-chart-VqILp" src="https://datawrapper.dwcdn.net/VqILp/7/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="507"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: 'f54b271c-da5e-46c7-b501-60be5a9b6a86'
    },
    {
      type: 'code',
      value: {
        title: '',
        code: '<iframe title="Tri-State Vaccinations" aria-label="Grouped Bars" id="datawrapper-chart-TegUh" src="https://datawrapper.dwcdn.net/TegUh/5/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="371"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();\n</script>'
      },
      id: '81f5168b-cdbb-4920-8676-246f98b70555'
    }
  ],
  sponsored_content: false,
  disable_comments: false,
  provocative_content: false,
  sensitive_content: false,
  related_links: [],
  related_authors: [
    {
      id: 121,
      first_name: 'Jaclyn',
      last_name: 'Jeffrey-Wilensky',
      photo: 327474,
      job_title: 'Data Reporter',
      biography: "Jaclyn writes data-driven health and science stories for WNYC/Gothamist. She also runs Gothamist's COVID data dashboards. She is an alumna of the Newmark Graduate School of Journalism. Her work has appeared in NBC News, Spectrum, the Daily Beast, and other outlets.",
      website: '',
      email: '',
      slug: 'jaclyn-jeffrey-wilensky'
    },
    {
      id: 146821,
      first_name: 'Nsikan',
      last_name: 'Akpan',
      job_title: 'Editor',
      biography: '',
      website: '',
      email: '',
      slug: 'nsikan-akpan'
    }
  ],
  related_contributing_organizations: [],
  related_sponsors: [],
  tags: [
    {
      name: 'data',
      slug: 'data'
    },
    {
      name: 'new york',
      slug: 'new-york'
    },
    {
      name: 'graphs',
      slug: 'graphs'
    },
    {
      name: 'data tracker',
      slug: 'data-tracker'
    },
    {
      name: 'statistics',
      slug: 'statistics'
    },
    {
      name: 'new york city',
      slug: 'new-york-city'
    },
    {
      name: 'coronavirus',
      slug: 'coronavirus'
    }
  ],
  show_as_feature: true,
  legacy_id: null,
  ancestry: [
    {
      id: 4,
      meta: {
        type: 'standardpages.IndexPage',
        detail_url: 'https://cms.prod.nypr.digital/api/v2/pages/4/',
        html_url: 'http://cms.prod.nypr.digital/news/'
      },
      title: 'News',
      slug: 'news'
    },
    {
      id: 3,
      meta: {
        type: 'home.HomePage',
        detail_url: 'https://cms.prod.nypr.digital/api/v2/pages/3/',
        html_url: 'http://cms.prod.nypr.digital/'
      },
      title: 'Gothamist',
      slug: 'home'
    },
    {
      id: 1,
      meta: {
        type: 'wagtailcore.Page',
        detail_url: 'https://cms.prod.nypr.digital/api/v2/pages/1/',
        html_url: null
      },
      title: 'Root',
      slug: 'root'
    }
  ]
})

export {
  coronavirusStatistics
}
