/*! jquery-restricted.js
 *
 * Authored by: Cory Dorning & Brett Metzger
 *
 * Dependencies: jQuery v1.8+
 *
 * Last modified by: Cory Dorning & Brett Metzger
 * Last modified on: 05/02/2013
 *
 * The jQuery plugin restricted allows you to restrict alphabetical or
 * numeric characters.  It defaults to restricting just special characters
 * and allows alphanumeric input.  You can specify restrictions through the
 * data-type attribute on your input.
 */

// include semicolon to make sure any JS before this plugin is terminated
;(function($) {
  // ECMAScript 5 strict mode
  "use strict";

  // begin plugin - change 'boilerplate' to name of your plugin
  $.fn.restricted = function(options) {

        // set any defaults
    var defaults = {
          type: 'alphanumeric', // default value of input type restriction
          allowed: false
        },

        // overwrite 'defaults' with those passed via 'options'
        settings = $.extend(defaults, options),

        // original jQuery object
        $sel = this,

        // alphabetical character?
        // (includes second set of characters due to 'keypress' keycode differences)
        alphabetical = function(keycode) {
          return (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123);
        },

        // currency characters
        // only allows numeric $ and .
        currency = function(keycode) {
          return keycode === 44 || keycode === 45 || keycode === 46 || numeric(keycode);
        },

        // numerical character?
        numeric = function(keycode) {
          return keycode > 47 && keycode < 58;
        },

        // alphanumeric character?
        alphanumeric = function(keycode) {
          return alphabetical(keycode) || numeric(keycode);
        },

        allowedChar = function(allowed, keycode) {
          var valid = false;

          for(var i = 0; i < allowed.length; i++) {
            var curr = allowed[i],
              char = charList[curr];

              console.log("allowed:" + char, "keycode:" + keycode);

            if(char === keycode){
              valid = true;
              break;
            }

          }

          return valid;
        },

        // allowed characters
        charList = {
          "!" : 33,
          "@" : 64,
          "#" : 35,
          "$" : 36,
          "%" : 37,
          "^" : 94,
          "&" : 38,
          "*" : 42,
          "(" : 40,
          ")" : 41,
          "-" : 45,
          "_" : 95,
          "=" : 61,
          "+" : 43
        },

        // valid variable
        validKey = function(e, data){
          var valid = false,

              type = data.type,

              allowed = data.allowed,

              // try charCode instead of which for FF
              // as all 'special' keys will return 0
              // and use which for IE based browsers
              keycode = e.charCode === 0 ? e.charCode : e.which;

          // check types
          if (type === 'alphanumeric') {
            valid = alphanumeric(keycode);
          } else if (type === 'alphabetical') {
            valid = alphabetical(keycode);
          } else if (type === 'currency') {
            valid = currency(keycode);
          } else if (type === 'numeric') {
            valid = numeric(keycode);
          } else {
            return;
          }

          //check allowed
          if(allowed && !valid) {
            valid = allowedChar(allowed, keycode);
          }

          if (!valid && keycode) {
            // invalid value && not a special key (FF)
            // so we prevent the default action
            e.preventDefault();
          }
        };

    /* loop context
     * =============
     * - return added to maintain jQuery chainability
     * - add needed for functionality within the loop
     *   for each individual instance of your jQuery object
     *
     */
    return $sel.each(function() {
          // current, single instance of $sel
      var $this = $(this),
          data = {
            allowed: $this.data('allowed') || settings.allowed,
            type: $this.data('type') || settings.type
          };

      $this.on('keypress', function(e){
        validKey(e, data);
      });

    });

  };
})(jQuery);