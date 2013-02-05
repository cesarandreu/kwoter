
/**
 * @test mock
 * @description Iterate 50k times
 **/

var shortr = require('../lib/shortr');

for (var i = 0; i < 50000; i++) {
  result = shortr.encode_url(i);
  console.log(i + " : " + result);    
};

/* EOF */