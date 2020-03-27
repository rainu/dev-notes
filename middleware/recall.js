export default function (ctx) {
  //we need to handle requests which cannot handle fragments (url with #)
  //so this middleware will look the real url and check if there is a recall query
  //if so, redirect to own recall-page with all the origin data

  if(window.location.search) {
    let queryParams = new URLSearchParams(window.location.search.substr(1))

    let recall = queryParams.has('recall')
    if(recall) {
      window.location = `${window.location.origin}${window.location.pathname}#/recall/${window.location.search}${window.location.hash}`
    }
  }
}
