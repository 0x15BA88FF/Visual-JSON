import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

function App({ Component, pageProps }) {
  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  return ( 
    <>
      <Head>
        <title>JSON Visualizer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"></meta>
        <meta name="theme-color" media="(prefers-color-scheme: dark)"  content="#0f172a"></meta>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="keywords" content="tools, JSON, json, visualize, data, science, data science, pascall de creator" />
        <meta name="description" content="creator: Pascall de creator, Turn raw JSON Data Into an understandable visual format you can share, make REST API JSON data hanbling easier Category: Tool"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App