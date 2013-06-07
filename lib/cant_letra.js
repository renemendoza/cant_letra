//console.log( 'Hey you' );

  var words = {
    digits: {
      1: 'un',
      2: 'dos',
      3: 'tres',
      4: 'cuatro',
      5: 'cinco',
      6: 'seis',
      7: 'siete',
      8: 'ocho',
      9: 'nueve',
    },
    ten_to_twenty:  {
      10: 'diez',
      11: 'once',
      12: 'doce',
      13: 'trece',
      14: 'catorce',
      15: 'quince',
      16: 'dieciseis',
      17: 'diecisiete',
      18: 'dieciocho',
      19: 'diecinueve',
      20: 'veinte'
    },

    tens:  {
      2: 'veinti',
      3: 'treinta',
      4: 'cuarenta',
      5: 'cincuenta',
      6: 'sesenta',
      7: 'setenta',
      8: 'ochenta',
      9: 'noventa' 
    },

    hundredths:  {
      //ciento
      1: 'cien',
      2: 'doscientos',
      3: 'trescientos',
      4: 'cuatrocientos',
      5: 'quinientos',
      6: 'seiscientos',
      7: 'setecientos',
      8: 'ochocientos',
      9: 'novecientos'
    },

    units: {
      1: 'unidades',
      2: 'decenas',
      3: 'centenas',
      4: 'miles',
      5: 'diezmiles',
      6: 'cienmiles',
      7: 'millones'
    }
  };



var atw = function amount_to_words( number ) {
  return (number + 1);
}

var ntw = {
  digit_to_words: function ( number ) {
    return (words['digits'][number]);
  },
  number_to_ary: function ( number ) {
    nl = number.toString().length;
    number_ary = [];
    for ( i = nl-1; i >= 0; i-- ) {
      p = Math.pow(10,i)

      number_ary[i] = Math.floor( number / p );
      number = Math.floor( number % p );
    }
    return number_ary;
  },
  process_hundredths: function ( number_part ) {
     var word = ''; 
     n = number_part.join('');
     spacer = '';
     if (number_part.length == 3) {
       m = n.split('').splice(1,2).join('');
       spacer = ( m == '00') ? '' : ' ';
       word = word + words['hundredths'][number_part.shift()];
       if (n > 100 && n < 200)
         word = word + 'to'
     }

     if (n == '000')
       return ''

     word = word + spacer + ntw.centesimal_component(number_part.join(''));
     return word;

  },
  evaluate_number: function ( number, currency, currency_abv ) {

    var word = '';
    number_parts = number.toString().split('.');
    var int = ntw.number_to_ary(number_parts[0]);
    var dec = number_parts[1];

    //console.log('numero es : ' + number);

    if (int.length > 6) {
      console.log( 'cant_letra solo trabaja con cantidades menores a un millon' );
      return '';

    } else if (int.length < 3) {
      word = ntw.centesimal_component(int.reverse().join(''));
    } else {
      hundredths = [];
      thousands = [];
      spacer = '';
      for ( i = 0; i < 3; i++ ) {
        hundredths.push(int.shift());
      }
      hundredths = hundredths.reverse();
      thousands = int.reverse();

      //console.log('thousands es : ' + thousands.join(''));
      //console.log('hundredths es : ' + hundredths.join(''));

      thousands_spacer = 'mil'
      if (thousands.length >= 1 ) {
        word =  ntw.process_hundredths(thousands) + ' ' + thousands_spacer;
      }

      hundredths_word = ntw.process_hundredths(hundredths);
      if (hundredths_word.length > 1) {
        spacer = (thousands.length >= 1) ? ' ' : ''; 
        word = word + spacer + hundredths_word;
      }

    }

    word = word + ' ' + currency;
    if (typeof dec == 'undefined')
      dec = '00'
    if (dec.length == 1)
      dec = dec + '0'

    if ( dec >= 0 && dec <= 99 ) {
      word = word + ' ' + dec + '/100 ' + currency_abv;
    }

    return word;
  },

  evaluate_number_with_currency: function ( number, currency_code ) {
    if (currency_code == 'MXN') {
      var currency = 'pesos';
      var currency_abv = 'M.N.';
    } else if (currency_code == 'USD') {
      var currency = 'dolares';
      var currency_abv = 'USD';
    }
    return ntw.evaluate_number( number, currency, currency_abv );
  },

  centesimal_component: function ( number ) {
    //agregar un guard para numeros mayores a 99 regresar empty string
    //
    word = '';
    n = parseInt(number);
    if (n > 99 || n < 1) {
      return word;
    }

    number_ary = ntw.number_to_ary(number);
    for ( i = number_ary.length-1; i >= 0; i-- ) {
      if ( i == 1) {
        if (number > 20) {
          word = word + words['tens'][number_ary[i]];
          if (number > 29) {
            if (number_ary[i-1] == 0) {
              break;
            } else {
              word = word + ' y ';
            }
          }
        } else if (number > 9) {
          word = word + words['ten_to_twenty'][number];
          break;
        }
      } else if ( i == 0) {
          word = word +  words['digits'][number_ary[i]];
      }
    }
    return word ;
  }

}


//module.exports.atw = atw;

//module.exports.ntw = ntw;


