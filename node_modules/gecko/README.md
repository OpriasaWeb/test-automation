#gecko

Converts a string into binary (two's complement) and or hexadecimal.

![](./char.png?raw=true)

#installation

    npm install gecko

##toBinary(string)

```javascript
var gecko = require('gecko').gecko()
var str = 'nodejs'
var binary = gecko.toBinary(str)
console.log(binary)
```

output

    { n: '01101110',
      o: '01101111',
      d: '01100100',
      e: '01100101',
      j: '01101010',
      s: '01110011' }

##toHex(string)

```javascript
var gecko = require('gecko').gecko()
var str = 'nodejs'
var hex = gecko.toHex(str)
console.log(hex)
```

output

    { n: 6e,
      o: 6f,
      d: 64,
      e: 65,
      j: 6a,
      s: 73 }


