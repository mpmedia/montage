/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */

var ARGO = require("./argo");

ARGO.makeWritableStream({
    lineNumber: 1,
    lineIndex: 0,
    advance: function (character, index) {
        console.log(index, character);
    },
    push: function (object, index) {
        console.log("PUSH", object, "AT", index);
    },
    pop: function (index, lastIndex) {
        console.log("POP AT", index, lastIndex);
    },
    set: function (key, index, lastIndex) {
        console.log("SET", JSON.stringify(key), "AT", index, lastIndex);
    },
    emit: function (value, index, lastIndex) {
        console.log("EMIT", JSON.stringify(value), "AT", index, lastIndex);
    },
    newLine: function (index) {
        this.lineNumber++;
        this.lineIndex = index;
        console.log("NEW LINE AT", index);
    },
    error: function (error, index, lastIndex) {
        console.log("ERROR on line", this.lineNumber, "column", (index - this.lineIndex));
        throw error;
    }
})
.write('{"a\\tb": "hi \\u0000", "b": ["bye", "now", [1, 0.1, 12, -1, 1e3, 1e-3, 1e+3, 1.0e3, 1E3]], "c": [true, null, false]}')
.end();

console.log(ARGO.parse('{"a\\tb": "hi \\u0000", "b": ["bye", "now", [1, 0.1, 12, -1, 1e3, 1e-3, 1e+3, 1.0e3, 1E3]], "c": [true, null, false]}'));

