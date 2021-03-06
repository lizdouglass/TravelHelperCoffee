(function() {
  window.UIHotelTemplate = '\
    \
    <h2>Accommodation</h2>\
    <table border="0" width="60%" cellspacing="1px" cellpadding="2px">\
        <tr>\
            <td>From: </td><td><input id="from-stay" onchange="" type="text" size="35" value="{{stayFrom}}" /></td>\
        </tr>\
        <tr>\
            <td>To: </td><td><input id="to-stay" onchange="" type="text" size="35" value="{{stayTo}}" /></td>\
        </tr>\
       <tr>\
            <td>At: </td><td>\
			<span id="hotel-content">\
				<select id="hotel-select">\
    				{{#hotels}}\
        				<option value="{{address}}">{{hotel}} | {{phone}}</option>\
    				{{/hotels}}\
    			</select>\
			</span></td>\
        </tr>\
        <tr>\
            <td>Room type: </td><td>\
                    <select id="room-types">\
                        <option value="1-bedroom">1 Bedroom</option>\
                        <option value="2-bedroom">2 Bedroom</option>\
                        <option value="studio">Studio</option>\
                    </select></td><td colspan="2">&nbsp;</td>\
        </tr>\
        <tr>\
            <td>Rate: $ </td><td><input id="rate" onchange="" type="text" maxlength="6" size="10" value="" />&nbsp;per night -\
					<select onchange="$(\'input#reservation\').trigger(\'change\');" id="payment-status">\
                        <option value=" - Please pay on Departure">Not paid</option>\
                        <option value="">Paid</option>                                                                                                                        \
                    </select></td>\
        </tr>\
        <tr>\
            <td>Reservation #: </td><td><input id="reservation" onchange="return UtilScraper.get().handleAccommodationOnChange()" type="text" size="35" value="" /></td>\
        </tr>\
    </table>';
}).call(this);
