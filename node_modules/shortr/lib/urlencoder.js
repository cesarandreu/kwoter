/*
The MIT License

Copyright (c) 2012 Samuel Vijaykumar

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without 
restriction, including without limitation the rights to use, 
copy, modify, merge, publish, distribute, sublicense, and/or 
sell copies of the Software, and to permit persons to whom 
the Software is furnished to do so, subject to the following 
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR 
OTHER DEALINGS IN THE SOFTWARE.

Todo
----

+ Decode Mechanism(should be simple enough)
+ Solve large number issues(like > 10737418239[2^32])

*/

var DEFAULT_ALPHABET = "mn6j2c4rv8bpygw95z7hsdaetxuk3fqQWERTYPSLMBKNXZ";
var DEFAULT_BLOCK_SIZE = 24;
var DAFAULT_LENGTH = 6;

function range(start, stop, step){
    if (typeof stop=='undefined'){
        // one param defined
        stop = start;
        start = 0;
    };
    if (typeof step=='undefined'){
        step = 1;
    };
    if ((step>0 && start>=stop) || (step<0 && start<=stop)){
        return [];
    };
    var result = [];
    for (var i=start; step>0 ? i<stop : i>stop; i+=step){
        result.push(i);
    };
    return result;
};

function pad(a,n){
  result = '';
  for(var i=0;i<n;i++) {
    result += a;
  };
  return result;
};

function URLEncoder(alphabet,block_size) {
  if(typeof alphabet === 'undefined') {
    alphabet = DEFAULT_ALPHABET;
  };

  if(typeof block_size === 'undefined') {
    block_size = DEFAULT_BLOCK_SIZE;
  };

  this.alphabet = alphabet;
  this.block_size = block_size;
  this.mask = (1 << block_size) -1;
  this.mappings = range(block_size);
  this.mappings.reverse();
};


URLEncoder.prototype.encode_url = function(n,min_length) {
  if (typeof min_length === 'undefined') {
    min_length = DAFAULT_LENGTH;
  };

  return this.enbase(this.encode(n), min_length);
};


URLEncoder.prototype.encode = function(n) {
  return (n & ~this.mask )| this._encode(n & this.mask);
};


URLEncoder.prototype._encode = function(n) {
  var result = 0;
  for(var i=0; i<this.mappings.length; i++) {
    if(n & (1<<i)) {
      result |= (1<<this.mappings[i]);
    };
  };
  return result;
};


URLEncoder.prototype.enbase = function(x,min_length) {
  if (typeof min_length === 'undefined') {
    min_length = DAFAULT_LENGTH;
  };
  var result = this._enbase(x);
  var padding = pad(this.alphabet[0], min_length - result.length);

  return padding+result;  
};


URLEncoder.prototype._enbase = function(x) {
  var n = this.alphabet.length;

  if(x<n){
    return this.alphabet[x];
  };

  return this._enbase(Math.floor(x/n)) + this.alphabet[x%n];
};


var urlencoder = new URLEncoder();


exports.encode = function(n){
  return urlencoder.encode(n);
};


exports.encode_url = function(n, min_length) {
  if (typeof min_length === 'undefined') {
    min_length = DAFAULT_LENGTH;
  };
  return urlencoder.encode_url(n,min_length);  
};
