var spawn 			= require('win-spawn');
var path 				= require('path');
var dir 			  = path.resolve(__dirname);
exports = module.exports  = {
	/**
	 *
	 * @function list
	 * @desc lists all interfaces
	 * available to scan.
	 *
	 */
	list: function() {
		var list = spawn(dir + "/windump -D");
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
		args[1] = '-i';
		args[2] = interface;
		var m = "Please press button now..";
		console.log(m);
		var tcpdump = spawn("arpdash", args, {});
		var devices = [];
		tcpdump.stdout.on('data', function(data) {
			var buffer = String(data);
			if(buffer) {
				var s = /[0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0+-9a-f][:-][0-9a-f][0-9a-f][:-][0-9a-f][0-9a-f]/g
				var regex = new RegExp(s);
				var mac = buffer.match(regex);
				if(mac) {
					var m = "Found device ";
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
		args[1] = "-i";
		args[2] = interface;
		args[3] = "-m";
		args[4] = mac;
		console.log("Listening on device (" + mac + "):");
		var tcpdump = spawn("arpdash", args, {});
		var pid = tcpdump.pid;
		tcpdump.stdout.on("data", function(data) {
			if(data) {
				cb();
				// process.exit(0);
			}
		});
	}
};
