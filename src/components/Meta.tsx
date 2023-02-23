// import { useState } from 'react'
// import axios from 'axios';
// import { JSDOM } from 'jsdom';

// type Props = {}

// const Meta = (props: Props) => {
//   const [title, setTitle] = useState("")
  
// function fetchPage(url: string): Promise<string | undefined> {
//   const HTMLData = axios
//     .get(url)
//     .then(res => res.data)
//     .catch((error) => {
//       console.error(`There was an error with ${error.config.url}.`);
//       console.error(error.toJSON());
//     });
//   return HTMLData;

// }

// async function fetchFromWebOrCache(url: string, ignoreCache = false) {
//   // Get the HTMLData from fetching or from cache
//   const HTMLData = '<html>...</html>'
//   const dom = new JSDOM(HTMLData);
//   return dom.window.document;
// }
  
// function extractData(document: Document) {
//   const writingLinks: HTMLAnchorElement[] = Array.from(
//     document.querySelectorAll('a.titlelink'),
//   );
//   return writingLinks.map(link => {
//     return {
//       title: link.text,
//     };
//   });
// }

// async function getData() {
//   const document = await fetchFromWebOrCache(
//     'https://news.ycombinator.com/',
//     true, // Hacker News is always changing, so ignore the cache!
//   );
//   const data = extractData(document);
 
// }

// // getData();
// console.log(fetchPage("https://www.thisdot.co/blog/web-scraping-with-typescript-and-node-js"))


//   return (
//     <img src={title}>hello</img>
//   )
// }

// export default Meta