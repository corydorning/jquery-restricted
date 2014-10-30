/*! jquery-restricted.js
 *
 * Authored by: Cory Dorning & Brett Metzger
 *
 * Dependencies: jQuery v1.8+
 *
 * Last modified by: Cory Dorning & Brett Metzger
 * Last modified on: 08/04/2014
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

            if(char === keycode){
              valid = true;
              break;
            }

          }

          return valid;
        },

        // allowed characters
        charList = {
          "!": 33,
          "\"": 34,
          "#": 35,
          "$": 36,
          "%": 37,
          "&": 38,
          "'": 39,
          "(": 40,
          ")": 41,
          "*": 42,
          "+": 43,
          ",": 44,
          "-": 45,
          ".": 46,
          "/": 47,
          "0": 48,
          "1": 49,
          "2": 50,
          "3": 51,
          "4": 52,
          "5": 53,
          "6": 54,
          "7": 55,
          "8": 56,
          "9": 57,
          ":": 58,
          ";": 59,
          "<": 60,
          "=": 61,
          ">": 62,
          "?": 63,
          "@": 64,
          "A": 65,
          "B": 66,
          "C": 67,
          "D": 68,
          "E": 69,
          "F": 70,
          "G": 71,
          "H": 72,
          "I": 73,
          "J": 74,
          "K": 75,
          "L": 76,
          "M": 77,
          "N": 78,
          "O": 79,
          "P": 80,
          "Q": 81,
          "R": 82,
          "S": 83,
          "T": 84,
          "U": 85,
          "V": 86,
          "W": 87,
          "X": 88,
          "Y": 89,
          "Z": 90,
          "[": 91,
          "\\": 92,
          "]": 93,
          "^": 94,
          "_": 95,
          "`": 96,
          "a": 97,
          "b": 98,
          "c": 99,
          "d": 100,
          "e": 101,
          "f": 102,
          "g": 103,
          "h": 104,
          "i": 105,
          "j": 106,
          "k": 107,
          "l": 108,
          "m": 109,
          "n": 110,
          "o": 111,
          "p": 112,
          "q": 113,
          "r": 114,
          "s": 115,
          "t": 116,
          "u": 117,
          "v": 118,
          "w": 119,
          "x": 120,
          "y": 121,
          "z": 122,
          "{": 123,
          "|": 124,
          "}": 125,
          "~": 126
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
// end restricted