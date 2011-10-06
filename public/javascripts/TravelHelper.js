(function() {
  var TravelHelper, th;
  window.TravelHelper = TravelHelper = (function() {
    function TravelHelper() {}
    TravelHelper.prototype.createView = function(screenScraper) {
      var flight, flights, passenger, view;
      passenger = screenScraper.passenger();
      flights = screenScraper.flights();
      screenScraper.getCarGoogleSpreadsheetAsJson();
      view = {
        passengerName: passenger.name,
        mobileNumber: passenger.mobileNumber,
        reservationNumber: passenger.reservationNumber,
        flights: (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = flights.length; _i < _len; _i++) {
            flight = flights[_i];
            _results.push(flight.toJSON());
          }
          return _results;
        })()
      };
      return view;
    };
    TravelHelper.prototype.run = function() {
      var readyScraper, s, scrapers, util, view, _i, _len;
      util = UtilScraper.get();
      scrapers = [];
      scrapers.push(new VirginScraper());
      scrapers.push(new QantasScraper());
      for (_i = 0, _len = scrapers.length; _i < _len; _i++) {
        s = scrapers[_i];
        if (s.isReady()) {
          readyScraper = s;
          console.log("TravelHelper:: Found ready scraper: " + s.name());
        }
      }
      if (readyScraper != null) {
        console.log("TravelHelper:: " + readyScraper.name() + " is starting to scrape..");
        view = this.createView(readyScraper);
        util.injectHtml(UITemplate, view, $("body"));
        ($('input#mobileNumber')).bind('focusout', function() {});
        ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
        ($('input#mobileNumber')).bind('change', function() {});
        return ($('span#mobileNumber')).text('(' + ($('input#mobileNumber')).val() + ')');
      } else {
        console.log("TravelHelper:: Does not have scraper ready!");
        return ($('body')).prepend("<p><h1>Oops! Text scraper is not ready. Contact TW support!</h1></p>");
      }
    };
    return TravelHelper;
  })();
  th = new TravelHelper();
  ($(document)).ready(function() {
    return th.run();
  });
  ($('div.logoVirginBlue')).hide();
}).call(this);
