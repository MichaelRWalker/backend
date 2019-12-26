const mongoose = require('mongoose');

module.exports.Appointment  = mongoose.model('Appointment'  ,require('../Schema/Appointment.schema' ));
module.exports.Artist       = mongoose.model('Artist'       ,require('../Schema/Artist.schema'      ));
module.exports.Payment      = mongoose.model('Payment'      ,require('../Schema/Payment.schema'     ));
module.exports.Project      = mongoose.model('Project'      ,require('../Schema/Project.schema'     ));
module.exports.Session      = mongoose.model('Session'      ,require('../Schema/Session.schema'     ));
module.exports.User         = mongoose.model('User'         ,require('../Schema/User.schema'        ));