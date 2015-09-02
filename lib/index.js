var spawn = require('win-spawn');
exports = module.exports  = {
	/**
	 *
	 * @function list
	 * @desc lists all interfaces
	 * available to scan.
	 *
	 */
	list: function() {
		var list = spawn("windump -D");
		list.stdout.on("data",
			function(data) {
				var buffer = String(data);
				console.log(buffer);
			}
		);
	},
	/**
	 *
	 * @function scan
	 * @param {string} interface
	 * @desc Scan for available
	 * dash button on interface
	 *
	 */
	scan: function(interface) {
		var args = [];
		args[0] = "scan";
		args[1] = interface;
		var m = "Please press button now..";
		console.log(m);
		var tcpdump = spawn("arp_dash", args, {});
		var devices = [];
		tcpdump.stdout.on('data', function(data) {
			var buffer = String(data);
			if(buffer) {
				var s = /[0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0+-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f]/g
				var regex = new RegExp(s);
				var mac = buffer.match(regex);
				if(mac) {
					var m = "Found device matching ";
					m += "with mac address: " + mac;
					console.log(m);
				}
			}
		});
	},
	/**
	 *
	 * @function listen
	 * @param {object} options
	 * @param {function} callback
	 * @desc Listen for a specific
	 * device on an interface and
	 * execute callback when pressed.
	 *
	 */
	listen: function(opts, cb) {
		var mac = (opts.mac || "");
		var interface = (opts.interface || "");
		var args = [];
		args[0] = "listen";
		args[1] = interface;
		args[2] = mac;
		console.log("Listening on device (" + mac + "):");
		var tcpdump = spawn("arp_dash", args, {});
		var pid = tcpdump.pid;
		tcpdump.stdout.on("data", function(data) {
			if(data) {
				cb();
				process.exit(0);
			}
		});
	}
};
// module.exports.scan(4);
// var opts = {
// 	interface: 4,
// 	mac: 'a0:02:dc:33:90:a3'
// };
// module.exports.listen(opts, function(data) {
// 	console.log("You pressed the button!");
// });
