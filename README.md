# arp-dash

A hack for the Amazon dash button to execute JavaScript when pressed.
Utilizes windump to listen for certain requests made
by the Amazon dash button. Has only been tested on Windows machines.

## Dependencies
- [WinPcap](http://www.winpcap.org/install/default.htm)

## Installation

```
npm install arp-dash -g
```

## Usage

```js
var arpdash = require("arp-dash");

// Print all available interfaces
arpdash.list();

// Listen on a particular interface by number
arpdash.scan(interface);

var opts = {
  interface: 4,
  mac: "xx:xx:xx:xx:xx:xx" //captured by scan function
};

// Listen on interface and mac address of device
arpdash.listen(opts, function() {
  //callback function to execute
  console.log("You pressed the button.");
});
```

## CLI

List available interfaces
```
arpdash list
```

Scan for dash button on specific interface
```
arpdash scan -i <interface>
```

Listen for a specific device on interface
```
arpdash listen -i <interface> -m <macAddress>
```
