describe("some math stuff", function() {

  it("The 'toBeGreaterThan' is for mathematical comparisons", function() {
    var pi = 3.1415926, e = 2.78;

    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });

});

describe("cant_letra", function() {
  var cant_letra = require('../lib/cant_letra.js');

  it("amount to words", function() {
   var atw = cant_letra.atw(4);
   expect(atw).toBe(5);
  });

});

describe("cant_letra:digit_to_words", function() {
  var cant_letra = require('../lib/cant_letra.js');

  it("1 should be un", function() {
   var ntw = cant_letra.ntw.digit_to_words(1);
   expect(ntw).toBe("un");
  });

  it("2 should be dos", function() {
   var ntw = cant_letra.ntw.digit_to_words(2);
   expect(ntw).toBe("dos");
  });

  it("3 should be tres", function() {
   var ntw = cant_letra.ntw.digit_to_words(3);
   expect(ntw).toBe("tres");
  });

  it("4 should be cuatro", function() {
   var ntw = cant_letra.ntw.digit_to_words(4);
   expect(ntw).toBe("cuatro");
  });

  it("999999.99 should be novecientos noventa y nueve mil novecientos noventa y nueve pesos 99/100 M.N.", function() {
   var ntw = cant_letra.ntw.evaluate_number_with_currency(999999.99);
   expect(ntw).toBe("novecientos noventa y nueve mil novecientos noventa y nueve pesos 99/100 M.N.");
  });

  it("100 should be cien pesos 00/100 M.N.", function() {
   var ntw = cant_letra.ntw.evaluate_number_with_currency(100);
   expect(ntw).toBe("cien pesos 00/100 M.N.");
  });


});
