window.UtilScraper = class UtilScraper
  
  instance = null 

  @get: ->
    if not instance?
      instance = new @
      instance.init('UtilScraper')

    instance  

  init: (name = "unknown") ->
    console.log "#{name} initialized"

  getGoogleSpreadsheetAsJson: (spreadsheetId, gridId, target, callback) ->
    url = 'http://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + gridId + '/public/basic?alt=json-in-script'
    $.get url, (res) ->
        jsonString = res.responseText.substring(res.responseText.indexOf("{"), res.responseText.lastIndexOf("}") + 1)
        jsonString
        json = jQuery.parseJSON jsonString
        callback.call target, json.feed.entry
  
  estimateDatetime: (datetimeStr, minutesToSubstructInt) ->
    estimatedMillis = new Number(minutesToSubstructInt) * 1000 * 60
    currMilliSeconds = Date.parse datetimeStr
    console.log currMilliSeconds
    estimatedNewTime = currMilliSeconds - estimatedMillis
    date = new Date estimatedNewTime
    formattedDate = date.getHours() + ":" + date.getMinutes() + " " + days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    console.log formattedDate
    formattedDate

  handleOnChange: (direction, flightNumber) ->
    fromAddress = ($ direction + "-" + flightNumber).val()
    targetAirport = ($ "input#" + direction + "-airport-" + flightNumber).val()
    targetDatetime = ($ "input#" + direction + "-datetime-" + flightNumber).val()
    targetCarTravelTime = ($ "origin-cartraveltime-" + flightNumber).val()
    targetDiv = "div#" + direction + "-travelinfo-" + flightNumber
    #alert "targetCarTravelTime: " + targetCarTravelTime + ", targetAirport: " + targetAirport + ", targetDatetime: " + targetDatetime + ", targetDiv: " + targetDiv
    ($ targetDiv).html "<h3>To " + targetAirport + " on " + targetDatetime + "</h3><br />From: " + handleOnChange


  injectHtml: (uiTemplate, view, htmlElement) ->
    inputForm = Mustache.to_html uiTemplate, view
    htmlElement.prepend inputForm
