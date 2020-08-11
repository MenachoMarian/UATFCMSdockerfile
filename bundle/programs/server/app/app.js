var require = meteorInstall({"lib":{"routes.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// lib/routes.js                                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function checkSitio(idSitio) {                                                                                         // 2
	Meteor.call('checkSiteRoute', idSitio, function (error, result) {                                                     // 3
		if (result.check == false) {                                                                                         // 4
			FlowRouter.go('/' + result.rol);                                                                                    // 5
		}                                                                                                                    // 6
	});                                                                                                                   // 7
}                                                                                                                      // 8
                                                                                                                       //
function checkRolUser() {                                                                                              // 9
	Meteor.call('redirectUser', 1, function (error, result) {                                                             // 10
		if (result.res == true) {                                                                                            // 11
			FlowRouter.go('/' + result.rol); //redirecciona al usuario segun su ROL o a la pagina principal si no inicio sesion
		}                                                                                                                    // 14
	});                                                                                                                   // 15
}                                                                                                                      // 16
                                                                                                                       //
function checkRolRoot() {                                                                                              // 17
	Meteor.call('checkRolRoot', 1, function (error, result) {                                                             // 18
		if (result.res == false) {                                                                                           // 19
			FlowRouter.go('/' + result.route);                                                                                  // 20
		}                                                                                                                    // 21
	});                                                                                                                   // 22
}                                                                                                                      // 23
                                                                                                                       //
function trackUser() {                                                                                                 // 25
	var ipPublic;                                                                                                         // 26
	$.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (json) {                                          // 27
		ipPublic = json.ip;                                                                                                  // 29
		var version = navigator.appVersion;                                                                                  // 30
		var obj = {                                                                                                          // 32
			version: version,                                                                                                   // 33
			ipPublic: ipPublic                                                                                                  // 34
		};                                                                                                                   // 32
		console.log(obj);                                                                                                    // 36
		Meteor.call('trackUser', 1, function (error, result) {//console.log(result);                                         // 37
		});                                                                                                                  // 39
	}); //console.log(ipPublic);                                                                                          // 40
}                                                                                                                      // 43
                                                                                                                       //
FlowRouter.subscriptions = function (params, queryParams) {                                                            // 44
	//console.log(params);                                                                                                // 47
	/*this.register("getnotificacionesr",Meteor.subscribe("getnotificacionesr"));                                         // 48
 this.register("getNotificaciones",Meteor.subscribe("getNotificaciones"));                                             //
 this.register("getNotVistas",Meteor.subscribe("getNotVistas"));*/Meteor.call('checkBan', 1, function (error, result) {
		if (result) {                                                                                                        // 53
			alert('Usted ha sido baneado');                                                                                     // 54
			Meteor.logout();                                                                                                    // 55
		}                                                                                                                    // 56
	});                                                                                                                   // 57
};                                                                                                                     // 58
                                                                                                                       //
FlowRouter.route("/", {                                                                                                // 59
	action: function (params, queryParams) {                                                                              // 61
		checkRolUser();                                                                                                      // 63
		BlazeLayout.render("raiz");                                                                                          // 65
	}                                                                                                                     // 66
}); //rutas del usuario root                                                                                           // 59
                                                                                                                       //
FlowRouter.route("/perfil", {                                                                                          // 70
	subscriptions: function (params, queryParams) {                                                                       // 71
		this.register("getUser", Meteor.subscribe('getUser'));                                                               // 73
	},                                                                                                                    // 74
	action: function (params, queryParams) {                                                                              // 76
		BlazeLayout.render("perfil");                                                                                        // 78
	}                                                                                                                     // 79
});                                                                                                                    // 70
FlowRouter.route("/root", {                                                                                            // 81
	subscriptions: function (params, queryParams) {                                                                       // 82
		this.register("getSitios", Meteor.subscribe('getSitios'));                                                           // 83
		this.register("getUsers", Meteor.subscribe('getUsers'));                                                             // 84
	},                                                                                                                    // 85
	action: function (params, queryParams) {                                                                              // 87
		checkRolRoot();                                                                                                      // 88
		BlazeLayout.render("root", {                                                                                         // 89
			contentroot: 'sitioslist'                                                                                           // 89
		});                                                                                                                  // 89
	}                                                                                                                     // 90
});                                                                                                                    // 81
FlowRouter.route("/root/sitios", {                                                                                     // 92
	subscriptions: function (params, queryParams) {                                                                       // 93
		this.register("getSitios", Meteor.subscribe('getSitios'));                                                           // 94
		this.register("getUsers", Meteor.subscribe('getUsers'));                                                             // 95
	},                                                                                                                    // 96
	action: function (params, queryParams) {                                                                              // 98
		checkRolRoot();                                                                                                      // 99
		BlazeLayout.render("root", {                                                                                         // 100
			contentroot: 'sitios'                                                                                               // 100
		});                                                                                                                  // 100
	}                                                                                                                     // 101
});                                                                                                                    // 92
FlowRouter.route("/root/usuarios", {                                                                                   // 103
	subscriptions: function (params, queryParams) {                                                                       // 104
		this.register("getUsers", Meteor.subscribe('getUsers'));                                                             // 105
	},                                                                                                                    // 106
	action: function (params, queryParams) {                                                                              // 108
		checkRolRoot();                                                                                                      // 109
		BlazeLayout.render("root", {                                                                                         // 110
			contentroot: 'usuarios'                                                                                             // 110
		});                                                                                                                  // 110
	}                                                                                                                     // 111
});                                                                                                                    // 103
FlowRouter.route("/root/reportes", {                                                                                   // 114
	subscriptions: function (params, queryParams) {//this.register("getSitios",Meteor.subscribe('getSitios'));            // 115
		//this.register("getInteg",Meteor.subscribe('getInteg'));                                                            // 117
	},                                                                                                                    // 118
	action: function (params, queryParams) {                                                                              // 119
		checkRolRoot();                                                                                                      // 121
		BlazeLayout.render("root", {                                                                                         // 123
			contentroot: 'reportes'                                                                                             // 123
		});                                                                                                                  // 123
	}                                                                                                                     // 125
});                                                                                                                    // 114
FlowRouter.route("/admin", {                                                                                           // 127
	subscriptions: function (params, queryParams) {                                                                       // 129
		this.register("getSitiosAdmin", Meteor.subscribe('getSitiosAdmin', Meteor.userId())); //console.log(params.user);// tomar en cuenta nombres de sitios reservados root admin u otro
	},                                                                                                                    // 135
	action: function (params, queryParams) {                                                                              // 136
		checkRolUser();                                                                                                      // 138
		BlazeLayout.render("adminMain");                                                                                     // 139
	}                                                                                                                     // 140
}); //del usuario admin                                                                                                // 127
                                                                                                                       //
FlowRouter.route("/admin/:titulo", {                                                                                   // 144
	subscriptions: function (params, queryParams) {                                                                       // 146
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 147
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 148
	},                                                                                                                    // 150
	action: function (params, queryParams) {                                                                              // 151
		checkSitio(params.titulo);                                                                                           // 153
		BlazeLayout.render("admin", {                                                                                        // 154
			templateadmin: 'welcomeAdmin'                                                                                       // 154
		});                                                                                                                  // 154
	}                                                                                                                     // 155
});                                                                                                                    // 144
FlowRouter.route("/admin/:titulo/header", {                                                                            // 158
	subscriptions: function (params, queryParams) {                                                                       // 159
		this.register("getHeader", Meteor.subscribe('getHeader', params.titulo)); //this.register("getCarrusel",Meteor.subscribe('getCarrusel',params.titulo));
                                                                                                                       //
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 163
	},                                                                                                                    // 166
	action: function (params, queryParams) {                                                                              // 167
		checkSitio(params.titulo);                                                                                           // 168
		BlazeLayout.render("admin", {                                                                                        // 169
			templateadmin: 'headeradmin'                                                                                        // 169
		});                                                                                                                  // 169
	}                                                                                                                     // 170
});                                                                                                                    // 158
FlowRouter.route("/admin/:titulo/banner", {                                                                            // 172
	subscriptions: function (params, queryParams) {                                                                       // 173
		this.register("getBanner", Meteor.subscribe('getBanner', params.titulo));                                            // 175
		this.register("getCarrusel", Meteor.subscribe('getCarrusel', params.titulo));                                        // 176
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 177
	},                                                                                                                    // 180
	action: function (params, queryParams) {                                                                              // 181
		checkSitio(params.titulo);                                                                                           // 182
		BlazeLayout.render("admin", {                                                                                        // 183
			templateadmin: 'banneradmin'                                                                                        // 183
		});                                                                                                                  // 183
	}                                                                                                                     // 184
});                                                                                                                    // 172
FlowRouter.route("/admin/:titulo/banner/editcarrusel/:id", {                                                           // 186
	subscriptions: function (params, queryParams) {                                                                       // 187
		this.register("getCarrusel", Meteor.subscribe('getCarrusel', params.titulo));                                        // 189
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 190
	},                                                                                                                    // 191
	action: function (params, queryParams) {                                                                              // 192
		checkSitio(params.titulo);                                                                                           // 193
		BlazeLayout.render("admin", {                                                                                        // 194
			templateadmin: 'editcarrusel'                                                                                       // 194
		});                                                                                                                  // 194
	}                                                                                                                     // 195
});                                                                                                                    // 186
FlowRouter.route("/admin/:titulo/navbar", {                                                                            // 197
	subscriptions: function (params, queryParams) {                                                                       // 198
		this.register("getMenu", Meteor.subscribe('getMenu', params.titulo));                                                // 199
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 200
		this.register("getNavbar", Meteor.subscribe('getNavbar', params.titulo));                                            // 201
		this.register("getSubmenu", Meteor.subscribe('getSubmenu', params.titulo)); //console.log(params);                   // 202
	},                                                                                                                    // 205
	action: function (params, queryParams) {                                                                              // 206
		//console.log(myTemplates.get());                                                                                    // 207
		//myTemplates.set("editarmenuenlace");                                                                               // 208
		checkSitio(params.titulo);                                                                                           // 209
		BlazeLayout.render("admin", {                                                                                        // 210
			templateadmin: 'navbaradmin'                                                                                        // 210
		});                                                                                                                  // 210
	}                                                                                                                     // 211
});                                                                                                                    // 197
FlowRouter.route("/admin/:titulo/navbar/nuevo", {                                                                      // 214
	subscriptions: function (params, queryParams) {                                                                       // 215
		this.register("getMenu", Meteor.subscribe('getMenu', params.titulo));                                                // 216
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo)); //console.log(params);                       // 217
	},                                                                                                                    // 219
	action: function (params, queryParams) {                                                                              // 220
		//console.log(myTemplates.get());                                                                                    // 221
		//myTemplates.set("editarmenuenlace");                                                                               // 222
		checkSitio(params.titulo);                                                                                           // 223
		BlazeLayout.render("admin", {                                                                                        // 224
			templateadmin: 'nuevomenu'                                                                                          // 224
		});                                                                                                                  // 224
	}                                                                                                                     // 225
}); /*FlowRouter.route("/admin/:titulo/navbar/editar",{                                                                // 214
    	subscriptions : function(params,queryParams){                                                                     //
    		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                      //
    		this.register("getSitio",Meteor.subscribe('getSitio',params.titulo));                                            //
    		//console.log(params);                                                                                           //
    	},                                                                                                                //
    	action : function(params,queryParams) {                                                                           //
    		//console.log(myTemplates.get());                                                                                //
    		//myTemplates.set("editarmenuenlace");                                                                           //
    		BlazeLayout.render("admin",{templateadmin:'editarmenu'});                                                        //
    	}                                                                                                                 //
    });*/                                                                                                              //
FlowRouter.route("/admin/:titulo/navbar/editarmenu", {                                                                 // 240
	subscriptions: function (params, queryParams) {                                                                       // 241
		this.register("getMenu", Meteor.subscribe('getMenu', params.titulo));                                                // 242
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo)); //console.log(params);                       // 243
	},                                                                                                                    // 245
	action: function (params, queryParams) {                                                                              // 246
		//console.log(myTemplates.get());                                                                                    // 247
		//myTemplates.set("editarmenuenlace");                                                                               // 248
		checkSitio(params.titulo);                                                                                           // 249
		BlazeLayout.render("admin", {                                                                                        // 250
			templateadmin: 'editarmenu'                                                                                         // 250
		});                                                                                                                  // 250
	}                                                                                                                     // 251
});                                                                                                                    // 240
FlowRouter.route("/admin/:titulo/menucontenido", {                                                                     // 253
	subscriptions: function (params, queryParams) {                                                                       // 254
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 255
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 256
		this.register("getMenu", Meteor.subscribe('getMenu', params.titulo));                                                // 257
		this.register("getSubmenu", Meteor.subscribe('getSubmenu', params.titulo));                                          // 258
		this.register("getCuerpo", Meteor.subscribe('getCuerpo', params.titulo));                                            // 259
	},                                                                                                                    // 260
	action: function (params, queryParams) {                                                                              // 261
		checkSitio(params.titulo);                                                                                           // 262
		BlazeLayout.render("admin", {                                                                                        // 263
			templateadmin: 'contentmenuadmin'                                                                                   // 263
		});                                                                                                                  // 263
	}                                                                                                                     // 264
});                                                                                                                    // 253
FlowRouter.route("/admin/:titulo/contenido/:idMenu", {                                                                 // 266
	subscriptions: function (params, queryParams) {                                                                       // 267
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 268
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 269
		this.register("getContenidos", Meteor.subscribe('getContenidos', params.idMenu));                                    // 270
		this.register("getOneMenu", Meteor.subscribe('getOneMenu', params.idMenu));                                          // 271
		this.register("getOneSubmenu", Meteor.subscribe('getOneSubmenu', params.idMenu));                                    // 272
	},                                                                                                                    // 274
	action: function (params, queryParams) {                                                                              // 275
		checkSitio(params.titulo);                                                                                           // 276
		BlazeLayout.render("admin", {                                                                                        // 277
			templateadmin: 'contentadmin'                                                                                       // 277
		});                                                                                                                  // 277
	}                                                                                                                     // 278
});                                                                                                                    // 266
FlowRouter.route("/admin/:titulo/newcontenido/:idMenu", {                                                              // 280
	subscriptions: function (params, queryParams) {                                                                       // 281
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 282
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 283
		this.register("getCuerpo", Meteor.subscribe('getCuerpo', params.titulo));                                            // 284
		this.register("getImages", Meteor.subscribe("getImages", params.titulo));                                            // 285
		this.register("getVideos", Meteor.subscribe("getVideos", params.titulo));                                            // 286
		this.register("getArchivos", Meteor.subscribe("getArchivos", params.titulo));                                        // 287
	},                                                                                                                    // 288
	action: function (params, queryParams) {                                                                              // 289
		checkSitio(params.titulo);                                                                                           // 290
		BlazeLayout.render("admin", {                                                                                        // 291
			templateadmin: 'newcontentadmin'                                                                                    // 291
		});                                                                                                                  // 291
	}                                                                                                                     // 292
});                                                                                                                    // 280
FlowRouter.route("/admin/:titulo/editcontenido/:idCont", {                                                             // 294
	subscriptions: function (params, queryParams) {                                                                       // 295
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 296
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 297
		this.register("getContenido", Meteor.subscribe('getContenido', params.idCont));                                      // 298
		this.register("getCuerpo", Meteor.subscribe('getCuerpo', params.titulo));                                            // 299
		this.register("getImages", Meteor.subscribe("getImages", params.titulo));                                            // 300
		this.register("getVideos", Meteor.subscribe("getVideos", params.titulo));                                            // 301
		this.register("getArchivos", Meteor.subscribe("getArchivos", params.titulo)); //Revisar universo                     // 302
		/*this.register("getVideos",Meteor.subscribe("getVideos"));                                                          // 304
  this.register("getArchivos",Meteor.subscribe("getArchivos"));*/                                                      //
	},                                                                                                                    // 306
	action: function (params, queryParams) {                                                                              // 307
		checkSitio(params.titulo);                                                                                           // 308
		BlazeLayout.render("admin", {                                                                                        // 309
			templateadmin: 'editcontentadmin'                                                                                   // 309
		});                                                                                                                  // 309
	}                                                                                                                     // 310
});                                                                                                                    // 294
FlowRouter.route("/admin/:titulo/sidebar", {                                                                           // 313
	subscriptions: function (params, queryParams) {                                                                       // 314
		this.register("getMenuEnlace", Meteor.subscribe('getMenuEnlace', params.titulo));                                    // 315
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 316
		this.register("getSidebar", Meteor.subscribe('getSidebar', params.titulo));                                          // 317
		this.register("getCuerpo", Meteor.subscribe('getCuerpo', params.titulo));                                            // 318
		this.register("getImages", Meteor.subscribe("getImages", params.titulo));                                            // 319
		this.register("getVideos", Meteor.subscribe("getVideos", params.titulo));                                            // 320
		this.register("getArchivos", Meteor.subscribe("getArchivos", params.titulo));                                        // 321
	},                                                                                                                    // 323
	action: function (params, queryParams) {                                                                              // 324
		checkSitio(params.titulo);                                                                                           // 325
		BlazeLayout.render("admin", {                                                                                        // 326
			templateadmin: 'sidebaradmin'                                                                                       // 326
		});                                                                                                                  // 326
	}                                                                                                                     // 327
});                                                                                                                    // 313
FlowRouter.route("/admin/:titulo/sidebar/nuevomenuenlace", {                                                           // 329
	subscriptions: function (params, queryParams) {                                                                       // 330
		//this.register("getSitios",Meteor.subscribe('getSitios'));                                                          // 331
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 332
	},                                                                                                                    // 333
	action: function (params, queryParams) {                                                                              // 334
		checkSitio(params.titulo);                                                                                           // 335
		BlazeLayout.render("admin", {                                                                                        // 336
			templateadmin: 'nuevomenuenlace'                                                                                    // 336
		});                                                                                                                  // 336
	}                                                                                                                     // 337
});                                                                                                                    // 329
FlowRouter.route("/admin/:titulo/sidebar/editarmenuenlace", {                                                          // 339
	subscriptions: function (params, queryParams) {                                                                       // 340
		this.register("getMenuEnlace", Meteor.subscribe('getMenuEnlace', params.titulo));                                    // 341
		this.register("getEnlaces", Meteor.subscribe('getEnlaces', queryParams.idmenuenlace));                               // 342
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo)); //console.log(queryParams);                  // 343
	},                                                                                                                    // 345
	action: function (params, queryParams) {                                                                              // 346
		checkSitio(params.titulo);                                                                                           // 347
		BlazeLayout.render("admin", {                                                                                        // 348
			templateadmin: 'editarmenuenlace'                                                                                   // 348
		});                                                                                                                  // 348
	}                                                                                                                     // 349
});                                                                                                                    // 339
FlowRouter.route("/admin/:titulo/sidebar/editarenlace", {                                                              // 352
	subscriptions: function (params, queryParams) {                                                                       // 353
		//this.register("getMenuEnlace",Meteor.subscribe('getMenuEnlace',queryParams.id));                                   // 354
		this.register("getEnlaces", Meteor.subscribe('getEnlaces', queryParams.idmenuenlace));                               // 355
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo)); //console.log(queryParams);                  // 356
	},                                                                                                                    // 358
	action: function (params, queryParams) {                                                                              // 359
		checkSitio(params.titulo);                                                                                           // 360
		BlazeLayout.render("admin", {                                                                                        // 361
			templateadmin: 'editarenlace'                                                                                       // 361
		});                                                                                                                  // 361
	}                                                                                                                     // 362
});                                                                                                                    // 352
FlowRouter.route("/admin/:titulo/footer", {                                                                            // 365
	subscriptions: function (params, queryParams) {                                                                       // 366
		this.register("getSitio", Meteor.subscribe('getSitio', params.titulo));                                              // 367
		this.register("getFooter", Meteor.subscribe('getFooter', params.titulo));                                            // 368
		this.register("getFooterLinks", Meteor.subscribe('getFooterLinks', params.titulo));                                  // 369
	},                                                                                                                    // 371
	action: function (params, queryParams) {                                                                              // 372
		checkSitio(params.titulo);                                                                                           // 373
		BlazeLayout.render("admin", {                                                                                        // 374
			templateadmin: 'footeradmin'                                                                                        // 374
		});                                                                                                                  // 374
	}                                                                                                                     // 375
});                                                                                                                    // 365
FlowRouter.route("/:titulo", {                                                                                         // 381
	action: function (params, queryParams) {                                                                              // 382
		BlazeLayout.render("site", {                                                                                         // 383
			banner: "banner",                                                                                                   // 383
			content: "contenthome"                                                                                              // 383
		});                                                                                                                  // 383
	},                                                                                                                    // 384
	subscriptions: function (params, queryParams) {                                                                       // 385
		this.register("getSitioClient", Meteor.subscribe('getSitioClient', params.titulo));                                  // 386
		this.register("getHeaderClient", Meteor.subscribe('getHeaderClient', params.titulo));                                // 387
		this.register("getBannerClient", Meteor.subscribe('getBannerClient', params.titulo));                                // 388
		this.register("getNavbarClient", Meteor.subscribe('getNavbarClient', params.titulo));                                // 389
		this.register("getSubmenuClient", Meteor.subscribe('getSubmenuClient', params.titulo));                              // 390
		this.register("getMenuClient", Meteor.subscribe('getMenuClient', params.titulo));                                    // 391
		this.register("getSidebarMenuClient", Meteor.subscribe('getSidebarMenuClient', params.titulo));                      // 392
		this.register("getSidebarClient", Meteor.subscribe('getSidebarClient', params.titulo));                              // 393
		this.register("getMenuenlaceClient", Meteor.subscribe('getMenuenlaceClient', params.titulo));                        // 394
		this.register("getCarruselClient", Meteor.subscribe('getCarruselClient', params.titulo));                            // 395
		this.register("getCuerpoClient", Meteor.subscribe("getCuerpoClient", params.titulo));                                // 396
		this.register("getHomeContentClient1", Meteor.subscribe('getHomeContentClient1', params.titulo));                    // 397
		this.register("getHomeContentClient2", Meteor.subscribe('getHomeContentClient2', params.titulo));                    // 398
		this.register("getFooterClient", Meteor.subscribe('getFooterClient', params.titulo));                                // 399
		this.register("getFooterLinksClient", Meteor.subscribe('getFooterLinksClient', params.titulo));                      // 400
	}                                                                                                                     // 401
});                                                                                                                    // 381
FlowRouter.route("/:titulo/:menu", {                                                                                   // 405
	action: function (params, queryParams) {                                                                              // 406
		render.set(true);                                                                                                    // 407
		renderfoot.set(true); //console.log(render.get());                                                                   // 408
                                                                                                                       //
		BlazeLayout.render("site", {                                                                                         // 410
			content: "contentmenu"                                                                                              // 410
		});                                                                                                                  // 410
	},                                                                                                                    // 411
	subscriptions: function (params, queryParams) {                                                                       // 412
		this.register("getSitioClient", Meteor.subscribe('getSitioClient', params.titulo));                                  // 413
		this.register("getHeaderClient", Meteor.subscribe('getHeaderClient', params.titulo));                                // 414
		this.register("getNavbarClient", Meteor.subscribe('getNavbarClient', params.titulo));                                // 416
		this.register("getSubmenuClient", Meteor.subscribe('getSubmenuClient', params.titulo));                              // 417
		this.register("getMenuClient", Meteor.subscribe('getMenuClient', params.titulo));                                    // 418
		this.register("getSidebarMenuClient", Meteor.subscribe('getSidebarMenuClient', params.titulo));                      // 419
		this.register("getSidebarClient", Meteor.subscribe('getSidebarClient', params.titulo));                              // 420
		this.register("getMenuenlaceClient", Meteor.subscribe('getMenuenlaceClient', params.titulo)); //console.log(params);
                                                                                                                       //
		this.register("getCuerpoClient", Meteor.subscribe("getCuerpoClient", params.titulo));                                // 423
		this.register("getContenidosMenuClient", Meteor.subscribe('getContenidosMenuClient', params.titulo, params.menu)); //this.register("getContenidoMenuClient",Meteor.subscribe('getContenidoMenuClient',params.titulo,params.menu));
                                                                                                                       //
		this.register("getFooterClient", Meteor.subscribe('getFooterClient', params.titulo));                                // 427
		this.register("getFooterLinksClient", Meteor.subscribe('getFooterLinksClient', params.titulo));                      // 428
	}                                                                                                                     // 429
});                                                                                                                    // 405
FlowRouter.route("/:titulo/:menu/:submenu", {                                                                          // 432
	action: function (params, queryParams) {                                                                              // 433
		render.set(true);                                                                                                    // 434
		renderfoot.set(true);                                                                                                // 435
		BlazeLayout.render("site", {                                                                                         // 436
			content: "contentsubmenu"                                                                                           // 436
		});                                                                                                                  // 436
	},                                                                                                                    // 437
	subscriptions: function (params, queryParams) {                                                                       // 438
		this.register("getSitioClient", Meteor.subscribe('getSitioClient', params.titulo));                                  // 439
		this.register("getHeaderClient", Meteor.subscribe('getHeaderClient', params.titulo));                                // 440
		this.register("getNavbarClient", Meteor.subscribe('getNavbarClient', params.titulo));                                // 442
		this.register("getSubmenuClient", Meteor.subscribe('getSubmenuClient', params.titulo));                              // 443
		this.register("getMenuClient", Meteor.subscribe('getMenuClient', params.titulo));                                    // 444
		this.register("getSidebarMenuClient", Meteor.subscribe('getSidebarMenuClient', params.titulo));                      // 446
		this.register("getSidebarClient", Meteor.subscribe('getSidebarClient', params.titulo));                              // 447
		this.register("getMenuenlaceClient", Meteor.subscribe('getMenuenlaceClient', params.titulo)); //patch only content   // 448
                                                                                                                       //
		this.register("getCuerpoClient", Meteor.subscribe("getCuerpoClient", params.titulo));                                // 450
		this.register("getContenidosSubmenuClient", Meteor.subscribe('getContenidosSubmenuClient', params.titulo, params.submenu));
		this.register("getFooterClient", Meteor.subscribe('getFooterClient', params.titulo));                                // 453
		this.register("getFooterLinksClient", Meteor.subscribe('getFooterLinksClient', params.titulo));                      // 454
	}                                                                                                                     // 455
});                                                                                                                    // 432
FlowRouter.route("/:titulo/:menu/m/:contenido", {                                                                      // 459
	name: 'menuContent',                                                                                                  // 460
	action: function (params, queryParams) {                                                                              // 461
		BlazeLayout.render("site", {                                                                                         // 463
			content: "contenido"                                                                                                // 463
		});                                                                                                                  // 463
	},                                                                                                                    // 464
	subscriptions: function (params, queryParams) {                                                                       // 465
		this.register("getSitioClient", Meteor.subscribe('getSitioClient', params.titulo));                                  // 466
		this.register("getHeaderClient", Meteor.subscribe('getHeaderClient', params.titulo));                                // 467
		this.register("getNavbarClient", Meteor.subscribe('getNavbarClient', params.titulo));                                // 469
		this.register("getSubmenuClient", Meteor.subscribe('getSubmenuClient', params.titulo));                              // 470
		this.register("getMenuClient", Meteor.subscribe('getMenuClient', params.titulo));                                    // 471
		this.register("getSidebarMenuClient", Meteor.subscribe('getSidebarMenuClient', params.titulo));                      // 472
		this.register("getSidebarClient", Meteor.subscribe('getSidebarClient', params.titulo));                              // 473
		this.register("getMenuenlaceClient", Meteor.subscribe('getMenuenlaceClient', params.titulo));                        // 474
		this.register("getCuerpoClient", Meteor.subscribe("getCuerpoClient", params.titulo));                                // 475
		this.register("getMContentClient", Meteor.subscribe('getMContentClient', params.titulo, params.menu, params.contenido));
		this.register("getComentsClient", Meteor.subscribe('getComentsClient', params.titulo, params.menu, params.contenido, 'menu'));
		this.register("getFooterClient", Meteor.subscribe('getFooterClient', params.titulo));                                // 480
		this.register("getFooterLinksClient", Meteor.subscribe('getFooterLinksClient', params.titulo));                      // 481
	}                                                                                                                     // 482
});                                                                                                                    // 459
FlowRouter.route("/:titulo/:menu/:submenu/:contenido", {                                                               // 486
	action: function (params, queryParams) {                                                                              // 488
		BlazeLayout.render("site", {                                                                                         // 491
			content: "contenido"                                                                                                // 491
		});                                                                                                                  // 491
	},                                                                                                                    // 492
	subscriptions: function (params, queryParams) {                                                                       // 493
		this.register("getSitioClient", Meteor.subscribe('getSitioClient', params.titulo));                                  // 494
		this.register("getHeaderClient", Meteor.subscribe('getHeaderClient', params.titulo));                                // 495
		this.register("getNavbarClient", Meteor.subscribe('getNavbarClient', params.titulo));                                // 497
		this.register("getSubmenuClient", Meteor.subscribe('getSubmenuClient', params.titulo));                              // 498
		this.register("getMenuClient", Meteor.subscribe('getMenuClient', params.titulo));                                    // 499
		this.register("getCuerpoClient", Meteor.subscribe("getCuerpoClient", params.titulo));                                // 500
		this.register("getSContentClient", Meteor.subscribe('getSContentClient', params.titulo, params.submenu, params.contenido));
		this.register("getComentsClient", Meteor.subscribe('getComentsClient', params.titulo, params.submenu, params.contenido, 'submenu'));
		this.register("getFooterClient", Meteor.subscribe('getFooterClient', params.titulo));                                // 504
		this.register("getFooterLinksClient", Meteor.subscribe('getFooterLinksClient', params.titulo));                      // 505
	}                                                                                                                     // 507
});                                                                                                                    // 486
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"collections":{"cmscollections.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// collections/cmscollections.js                                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
    Meteor: function (v) {                                                                                             // 1
        Meteor = v;                                                                                                    // 1
    }                                                                                                                  // 1
}, 0);                                                                                                                 // 1
var FilesCollection = void 0;                                                                                          // 1
module.watch(require("meteor/ostrio:files"), {                                                                         // 1
    FilesCollection: function (v) {                                                                                    // 1
        FilesCollection = v;                                                                                           // 1
    }                                                                                                                  // 1
}, 1);                                                                                                                 // 1
var Mongo = void 0;                                                                                                    // 1
module.watch(require("meteor/mongo"), {                                                                                // 1
    Mongo: function (v) {                                                                                              // 1
        Mongo = v;                                                                                                     // 1
    }                                                                                                                  // 1
}, 2);                                                                                                                 // 1
SITIO = new Mongo.Collection('sitio');                                                                                 // 6
var sitioSchema = new SimpleSchema({                                                                                   // 8
    titulo: {                                                                                                          // 10
        type: String                                                                                                   // 11
    },                                                                                                                 // 10
    carrera: {                                                                                                         // 13
        type: String                                                                                                   // 14
    },                                                                                                                 // 13
    creado: {                                                                                                          // 16
        type: Date,                                                                                                    // 17
        autoValue: function () {                                                                                       // 18
            return new Date();                                                                                         // 19
        }                                                                                                              // 20
    },                                                                                                                 // 16
    estado: {                                                                                                          // 22
        type: String                                                                                                   // 23
    },                                                                                                                 // 22
    admin: {                                                                                                           // 25
        type: String                                                                                                   // 26
    }                                                                                                                  // 25
});                                                                                                                    // 8
SITIO.attachSchema(sitioSchema);                                                                                       // 30
BANNER = new Mongo.Collection('banner');                                                                               // 33
var bannerSchema = new SimpleSchema({                                                                                  // 35
    idSitio: {                                                                                                         // 36
        type: String                                                                                                   // 37
    },                                                                                                                 // 36
    tipo: {                                                                                                            // 39
        type: String //DEFAULT TEXTO E IMAGEN                                                                          // 40
                                                                                                                       //
    },                                                                                                                 // 39
    texto: {                                                                                                           // 42
        type: String //titulo o lorem ipsum                                                                            // 43
                                                                                                                       //
    },                                                                                                                 // 42
    imagen: {                                                                                                          // 45
        type: String //link de una imagen por defecto                                                                  // 46
                                                                                                                       //
    },                                                                                                                 // 45
    textoPersonalizado: {                                                                                              // 48
        type: String // la parte de html libre                                                                         // 49
                                                                                                                       //
    }                                                                                                                  // 48
});                                                                                                                    // 35
BANNER.attachSchema(bannerSchema);                                                                                     // 54
CARROUSEL = new Mongo.Collection('carrousel'); ///SE asocia directamnet al sitio ¡¡¡ solo un carrusel                  // 56
                                                                                                                       //
var carrouselSchema = new SimpleSchema({                                                                               // 58
    idSitio: {                                                                                                         // 59
        type: String                                                                                                   // 60
    },                                                                                                                 // 59
    titulo: {                                                                                                          // 62
        type: String //DEFAULT TEXTO E IMAGEN                                                                          // 63
                                                                                                                       //
    },                                                                                                                 // 62
    texto: {                                                                                                           // 65
        type: String //                                                                                                // 66
                                                                                                                       //
    },                                                                                                                 // 65
    imagen: {                                                                                                          // 68
        type: String //link de una imagen por defecto                                                                  // 69
                                                                                                                       //
    },                                                                                                                 // 68
    link: {                                                                                                            // 71
        type: String,                                                                                                  // 72
        //link del boton                                                                                               // 72
        optional: true                                                                                                 // 73
    }                                                                                                                  // 71
});                                                                                                                    // 58
CARROUSEL.attachSchema(carrouselSchema);                                                                               // 77
HEADER = new Mongo.Collection('header');                                                                               // 79
var headerSchema = new SimpleSchema({                                                                                  // 81
    idSitio: {                                                                                                         // 83
        type: String                                                                                                   // 84
    },                                                                                                                 // 83
    titulo: {                                                                                                          // 86
        type: String                                                                                                   // 87
    },                                                                                                                 // 86
    subtitulo: {                                                                                                       // 89
        type: String,                                                                                                  // 90
        optional: true                                                                                                 // 91
    },                                                                                                                 // 89
    tipoFondo: {                                                                                                       // 93
        type: String //si es color o imagen                                                                            // 94
                                                                                                                       //
    },                                                                                                                 // 93
    fondo: {                                                                                                           // 96
        type: String //link o el color                                                                                 // 97
                                                                                                                       //
    },                                                                                                                 // 96
    fuente: {                                                                                                          // 99
        type: String                                                                                                   // 100
    },                                                                                                                 // 99
    logo1: {                                                                                                           // 102
        type: String,                                                                                                  // 103
        optional: true                                                                                                 // 104
    },                                                                                                                 // 102
    logo2: {                                                                                                           // 106
        type: String,                                                                                                  // 107
        optional: true                                                                                                 // 108
    },                                                                                                                 // 106
    posicion: {                                                                                                        // 110
        type: String                                                                                                   // 111
    }                                                                                                                  // 110
});                                                                                                                    // 81
HEADER.attachSchema(headerSchema);                                                                                     // 114
NAVBAR = new Mongo.Collection('navbar');                                                                               // 116
var navbarSchema = new SimpleSchema({                                                                                  // 118
    idSitio: {                                                                                                         // 119
        type: String                                                                                                   // 120
    },                                                                                                                 // 119
    color: {                                                                                                           // 122
        type: String                                                                                                   // 123
    },                                                                                                                 // 122
    fuente: {                                                                                                          // 125
        type: String                                                                                                   // 126
    }                                                                                                                  // 125
});                                                                                                                    // 118
NAVBAR.attachSchema(navbarSchema);                                                                                     // 129
MENU = new Mongo.Collection('menu');                                                                                   // 131
var menuSchema = new SimpleSchema({                                                                                    // 133
    /*idNavbar :{                                                                                                      // 135
        type:String,                                                                                                   //
    },---- mientars no haya problema con referencia al navbar*/nombre: {                                               //
        type: String                                                                                                   // 139
    },                                                                                                                 // 138
    link: {                                                                                                            // 141
        type: String                                                                                                   // 142
    },                                                                                                                 // 141
    tipo: {                                                                                                            // 144
        type: String //normal o con submenu                                                                            // 145
                                                                                                                       //
    },                                                                                                                 // 144
    idSitio: {                                                                                                         // 147
        type: String //aqui va el id del sitio                                                                         // 148
                                                                                                                       //
    },                                                                                                                 // 147
    estado: {                                                                                                          // 150
        type: String //activo o inactivo                                                                               // 151
                                                                                                                       //
    },                                                                                                                 // 150
    contenido: {                                                                                                       // 153
        type: String //si ya tiene contenido                                                                           // 154
                                                                                                                       //
    }                                                                                                                  // 153
});                                                                                                                    // 133
MENU.attachSchema(menuSchema);                                                                                         // 158
SUBMENU = new Mongo.Collection('submenu');                                                                             // 160
var submenuSchema = new SimpleSchema({                                                                                 // 162
    idSitio: {                                                                                                         // 163
        type: String                                                                                                   // 164
    },                                                                                                                 // 163
    idMenu: {                                                                                                          // 166
        type: String                                                                                                   // 167
    },                                                                                                                 // 166
    nombre: {                                                                                                          // 169
        type: String                                                                                                   // 170
    },                                                                                                                 // 169
    link: {                                                                                                            // 172
        type: String                                                                                                   // 173
    },                                                                                                                 // 172
    estado: {                                                                                                          // 175
        type: String //activo o inactivo                                                                               // 176
                                                                                                                       //
    }                                                                                                                  // 175
});                                                                                                                    // 162
SUBMENU.attachSchema(submenuSchema); // Aqui termna todo del navbar                                                    // 179
                                                                                                                       //
CUERPO = new Mongo.Collection('cuerpo');                                                                               // 182
var cuerpoSchema = new SimpleSchema({                                                                                  // 184
    idSitio: {                                                                                                         // 186
        type: String                                                                                                   // 187
    },                                                                                                                 // 186
    tipoFondo: {                                                                                                       // 189
        type: String //si es color o imagen                                                                            // 190
                                                                                                                       //
    },                                                                                                                 // 189
    fondo: {                                                                                                           // 192
        type: String //link o el color                                                                                 // 193
                                                                                                                       //
    }                                                                                                                  // 192
});                                                                                                                    // 184
CUERPO.attachSchema(cuerpoSchema);                                                                                     // 196
CONTENIDO = new Mongo.Collection('contenido');                                                                         // 198
var contenidoSchema = new SimpleSchema({                                                                               // 200
    idSitio: {                                                                                                         // 202
        type: String                                                                                                   // 203
    },                                                                                                                 // 202
    idMenu: {                                                                                                          // 205
        type: String                                                                                                   // 206
    },                                                                                                                 // 205
    titulo: {                                                                                                          // 208
        type: String                                                                                                   // 209
    },                                                                                                                 // 208
    ruta: {                                                                                                            // 211
        type: String                                                                                                   // 212
    },                                                                                                                 // 211
    descripcion: {                                                                                                     // 214
        type: String                                                                                                   // 214
    },                                                                                                                 // 214
    contenidoHtml: {                                                                                                   // 216
        type: String                                                                                                   // 216
    },                                                                                                                 // 216
    imagenDesc: {                                                                                                      // 218
        type: String //src de la imagen desc                                                                           // 219
                                                                                                                       //
    },                                                                                                                 // 218
    comentarios: {                                                                                                     // 221
        type: String                                                                                                   // 222
    },                                                                                                                 // 221
    visible: {                                                                                                         // 224
        type: String                                                                                                   // 225
    },                                                                                                                 // 224
    creado: {                                                                                                          // 227
        type: Date,                                                                                                    // 228
        autoValue: function () {                                                                                       // 229
            return new Date();                                                                                         // 230
        }                                                                                                              // 231
    },                                                                                                                 // 227
    lastEdit: {                                                                                                        // 233
        type: Date,                                                                                                    // 234
        optional: true                                                                                                 // 235
    }                                                                                                                  // 233
});                                                                                                                    // 200
CONTENIDO.attachSchema(contenidoSchema);                                                                               // 238
COMENTARIO = new Mongo.Collection('comentario');                                                                       // 240
var comentarioSchema = new SimpleSchema({                                                                              // 242
    /*                                                                                                                 // 243
    idSitio : {                                                                                                        //
        type:String,                                                                                                   //
    },                                                                                                                 //
                                                                                                                       //
    idMenu : {                                                                                                         //
        type:String,                                                                                                   //
    },*/idContenido: {                                                                                                 //
        type: String                                                                                                   // 253
    },                                                                                                                 // 252
    texto: {                                                                                                           // 255
        type: String                                                                                                   // 256
    },                                                                                                                 // 255
    idUsuario: {                                                                                                       // 258
        type: String                                                                                                   // 259
    },                                                                                                                 // 258
    estado: {                                                                                                          // 261
        type: String //visible u oculto(baneado)                                                                       // 262
                                                                                                                       //
    },                                                                                                                 // 261
    creado: {                                                                                                          // 264
        type: Date,                                                                                                    // 265
        autoValue: function () {                                                                                       // 266
            return new Date();                                                                                         // 267
        }                                                                                                              // 268
    },                                                                                                                 // 264
    lastEdit: {                                                                                                        // 270
        type: Date,                                                                                                    // 271
        optional: true                                                                                                 // 272
    }                                                                                                                  // 270
});                                                                                                                    // 242
COMENTARIO.attachSchema(comentarioSchema); // REVISAR SIDEBAR                                                          // 275
                                                                                                                       //
SIDEBARMENU = new Mongo.Collection('sidebarmenu');                                                                     // 278
var sidebarMenuSchema = new SimpleSchema({                                                                             // 280
    idSitio: {                                                                                                         // 282
        type: String                                                                                                   // 283
    },                                                                                                                 // 282
    tipoFondo: {                                                                                                       // 285
        type: String //si es color o imagen                                                                            // 286
                                                                                                                       //
    },                                                                                                                 // 285
    fondo: {                                                                                                           // 288
        type: String //link de la imagen o el color                                                                    // 289
                                                                                                                       //
    },                                                                                                                 // 288
    fuente: {                                                                                                          // 291
        type: String                                                                                                   // 292
    },                                                                                                                 // 291
    tipo: {                                                                                                            // 294
        type: String                                                                                                   // 295
    },                                                                                                                 // 294
    html: {                                                                                                            // 297
        type: String,                                                                                                  // 298
        optional: true                                                                                                 // 299
    }                                                                                                                  // 297
});                                                                                                                    // 280
SIDEBARMENU.attachSchema(sidebarMenuSchema);                                                                           // 303
MENUENLACE = new Mongo.Collection('menuenlace');                                                                       // 305
var menuenlaceSchema = new SimpleSchema({                                                                              // 307
    idSitio: {                                                                                                         // 309
        type: String                                                                                                   // 310
    },                                                                                                                 // 309
    nombre: {                                                                                                          // 312
        type: String                                                                                                   // 313
    },                                                                                                                 // 312
    posicion: {                                                                                                        // 315
        type: String                                                                                                   // 316
    },                                                                                                                 // 315
    estado: {                                                                                                          // 318
        type: String                                                                                                   // 319
    }                                                                                                                  // 318
});                                                                                                                    // 307
MENUENLACE.attachSchema(menuenlaceSchema);                                                                             // 322
ENLACE = new Mongo.Collection('enlace');                                                                               // 324
var enlaceSchema = new SimpleSchema({                                                                                  // 326
    idSitio: {                                                                                                         // 328
        type: String                                                                                                   // 329
    },                                                                                                                 // 328
    idMenu: {                                                                                                          // 331
        type: String                                                                                                   // 332
    },                                                                                                                 // 331
    nombre: {                                                                                                          // 334
        type: String                                                                                                   // 335
    },                                                                                                                 // 334
    url: {                                                                                                             // 337
        type: String                                                                                                   // 338
    }                                                                                                                  // 337
});                                                                                                                    // 326
ENLACE.attachSchema(enlaceSchema);                                                                                     // 341
FOOTER = new Mongo.Collection('footer');                                                                               // 344
var footerSchema = new SimpleSchema({                                                                                  // 346
    idSitio: {                                                                                                         // 348
        type: String                                                                                                   // 349
    },                                                                                                                 // 348
    //el fondo es copia del navbar                                                                                     // 351
    fuente: {                                                                                                          // 352
        type: String                                                                                                   // 353
    },                                                                                                                 // 352
    texto: {                                                                                                           // 355
        type: String // pore el momento se pueden add mas cosas (menus.etc)                                            // 356
                                                                                                                       //
    },                                                                                                                 // 355
    tipo: {                                                                                                            // 358
        type: String // tipo de footer default o personalizado                                                         // 359
                                                                                                                       //
    },                                                                                                                 // 358
    html: {                                                                                                            // 361
        type: String,                                                                                                  // 362
        // codigo html personalizado                                                                                   // 362
        optional: true                                                                                                 // 363
    }                                                                                                                  // 361
});                                                                                                                    // 346
FOOTER.attachSchema(footerSchema);                                                                                     // 367
FOOTERLINKS = new Mongo.Collection('footerlinks');                                                                     // 369
var footerlinksSchema = new SimpleSchema({                                                                             // 371
    idSitio: {                                                                                                         // 373
        type: String                                                                                                   // 374
    },                                                                                                                 // 373
    icono: {                                                                                                           // 376
        type: String                                                                                                   // 377
    },                                                                                                                 // 376
    link: {                                                                                                            // 379
        type: String                                                                                                   // 380
    }                                                                                                                  // 379
});                                                                                                                    // 371
FOOTERLINKS.attachSchema(footerlinksSchema); //Archivos con ostrio                                                     // 384
                                                                                                                       //
var defaultSchema = {                                                                                                  // 388
    size: {                                                                                                            // 389
        type: Number                                                                                                   // 390
    },                                                                                                                 // 389
    name: {                                                                                                            // 392
        type: String                                                                                                   // 393
    },                                                                                                                 // 392
    type: {                                                                                                            // 395
        type: String                                                                                                   // 396
    },                                                                                                                 // 395
    path: {                                                                                                            // 398
        type: String                                                                                                   // 399
    },                                                                                                                 // 398
    isVideo: {                                                                                                         // 401
        type: Boolean                                                                                                  // 402
    },                                                                                                                 // 401
    isAudio: {                                                                                                         // 404
        type: Boolean                                                                                                  // 405
    },                                                                                                                 // 404
    isImage: {                                                                                                         // 407
        type: Boolean                                                                                                  // 408
    },                                                                                                                 // 407
    isText: {                                                                                                          // 410
        type: Boolean                                                                                                  // 411
    },                                                                                                                 // 410
    isJSON: {                                                                                                          // 413
        type: Boolean                                                                                                  // 414
    },                                                                                                                 // 413
    isPDF: {                                                                                                           // 416
        type: Boolean                                                                                                  // 417
    },                                                                                                                 // 416
    extension: {                                                                                                       // 419
        type: String,                                                                                                  // 420
        optional: true                                                                                                 // 421
    },                                                                                                                 // 419
    _storagePath: {                                                                                                    // 423
        type: String                                                                                                   // 424
    },                                                                                                                 // 423
    _downloadRoute: {                                                                                                  // 426
        type: String                                                                                                   // 427
    },                                                                                                                 // 426
    _collectionName: {                                                                                                 // 429
        type: String                                                                                                   // 430
    },                                                                                                                 // 429
    "public": {                                                                                                        // 432
        type: Boolean,                                                                                                 // 433
        optional: true                                                                                                 // 434
    },                                                                                                                 // 432
    meta: {                                                                                                            // 436
        type: Object                                                                                                   // 437
    },                                                                                                                 // 436
    userId: {                                                                                                          // 439
        type: String,                                                                                                  // 440
        optional: true                                                                                                 // 441
    },                                                                                                                 // 439
    updatedAt: {                                                                                                       // 443
        type: Date,                                                                                                    // 444
        optional: true                                                                                                 // 445
    },                                                                                                                 // 443
    versions: {                                                                                                        // 447
        type: Object,                                                                                                  // 448
        blackbox: true                                                                                                 // 449
    }                                                                                                                  // 447
};                                                                                                                     // 388
var newMeta = {                                                                                                        // 452
    'meta.idSitio': {                                                                                                  // 453
        type: String                                                                                                   // 454
    }                                                                                                                  // 453
};                                                                                                                     // 452
                                                                                                                       //
_.extend(defaultSchema, newMeta); //console.log(defaultSchema);                                                        // 457
                                                                                                                       //
                                                                                                                       //
IMAGES = new FilesCollection({                                                                                         // 459
    collectionName: 'images',                                                                                          // 460
    allowClientCode: false,                                                                                            // 461
    // Disallow remove files from Client                                                                               // 461
    schema: defaultSchema,                                                                                             // 462
    storagePath: '/uatfcms/data',                                                                                      // 463
    downloadRoute: '/uatfcms/data/downloads',                                                                          // 464
    allowClient: false,                                                                                                // 465
    onBeforeUpload: function (file) {                                                                                  // 466
        //console.log(file);                                                                                           // 467
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats                                             // 468
        if (file.size <= 10485760 && /png|jpg|jpeg|bmp|gif|tif/i.test(file.extension)) {                               // 469
            return true;                                                                                               // 470
        } else {                                                                                                       // 471
            return 'Please upload image, with size equal or less than 10MB';                                           // 472
        }                                                                                                              // 473
    }                                                                                                                  // 474
});                                                                                                                    // 459
                                                                                                                       //
_.extend(defaultSchema, newMeta);                                                                                      // 478
                                                                                                                       //
IMAGES.collection.attachSchema(new SimpleSchema(defaultSchema));                                                       // 479
AVATARS = new FilesCollection({                                                                                        // 481
    collectionName: 'avatars',                                                                                         // 482
    allowClientCode: false,                                                                                            // 483
    // Disallow remove files from Client                                                                               // 483
    storagePath: '/uatfcms/data',                                                                                      // 484
    downloadRoute: '/uatfcms/data/downloads',                                                                          // 485
    allowClient: false,                                                                                                // 486
    onBeforeUpload: function (file) {                                                                                  // 488
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats                                             // 489
        if (file.size <= 10485760 && /png|jpg|jpeg|bmp|gif/i.test(file.extension)) {                                   // 490
            return true;                                                                                               // 491
        } else {                                                                                                       // 492
            return 'Por favor sube una image valida, con un tamaño menor o igual a 10MB';                              // 493
        }                                                                                                              // 494
    }                                                                                                                  // 495
}); //pending                                                                                                          // 481
                                                                                                                       //
VIDEOS = new FilesCollection({                                                                                         // 502
    collectionName: 'videos',                                                                                          // 503
    //allowClientCode: false, // Disallow remove files from Client                                                     // 504
    storagePath: '/uatfcms/data',                                                                                      // 505
    downloadRoute: '/uatfcms/data/downloads',                                                                          // 506
    allowClient: false,                                                                                                // 507
    schema: defaultSchema,                                                                                             // 508
    onBeforeUpload: function (file) {                                                                                  // 509
        // Allow upload files under 100MB, and only in png/jpg/jpeg formats                                            // 510
        if (file.size <= 2097143200 && /avi|mp4|m4a|mpeg|mov|rm|flv|div|mpg|mkv|wmv|wma|vob|qt|qtl|ogv/i.test(file.extension)) {
            return true;                                                                                               // 512
        } else {                                                                                                       // 513
            return 'Por favor sube un video valido , con un tamaño menor o igual 200MBs';                              // 514
        }                                                                                                              // 515
    }                                                                                                                  // 516
});                                                                                                                    // 502
VIDEOS.collection.attachSchema(new SimpleSchema(defaultSchema));                                                       // 518
ARCHIVOS = new FilesCollection({                                                                                       // 520
    collectionName: 'archivos',                                                                                        // 521
    allowClientCode: false,                                                                                            // 522
    // Disallow remove files from Client                                                                               // 522
    storagePath: '/uatfcms/data',                                                                                      // 523
    downloadRoute: '/uatfcms/data/downloads',                                                                          // 524
    allowClient: false,                                                                                                // 525
    schema: defaultSchema,                                                                                             // 526
    onBeforeUpload: function (file) {                                                                                  // 527
        ///console.log(file);                                                                                          // 528
        // Allow upload files under 100MB, and only in png/jpg/jpeg formats                                            // 529
        if (file.size <= 208908200 && !/autorun|inf|bat|pif|scr|com|cmd|job|lnk|prf|reg|tmp|xnk|htm|html|js/i.test(file.extension)) {
            return true;                                                                                               // 531
        } else {                                                                                                       // 532
            return 'Por favor sube un archivo valido (Documento,Instalador,comprimido,etc),\n Con un tamaño menor o igual 200MBs';
        }                                                                                                              // 534
    }                                                                                                                  // 536
});                                                                                                                    // 520
ARCHIVOS.collection.attachSchema(new SimpleSchema(defaultSchema));                                                     // 538
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"methods.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/methods.js                                                                                                   //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
Meteor.startup(function () {                                                                                           // 3
  // code to run on server at startup                                                                                  // 4
  reCAPTCHA.config({                                                                                                   // 5
    privatekey: '6LdwFG8UAAAAAFQf2JQ-nsi3BZ01yzvEZYZ7xPVn'                                                             // 6
  });                                                                                                                  // 5
  Meteor.methods({                                                                                                     // 8
    checkBan: function () {                                                                                            // 9
      var user = Meteor.users.findOne({                                                                                // 10
        _id: this.userId,                                                                                              // 10
        'profile.bloqueado': true                                                                                      // 10
      });                                                                                                              // 10
                                                                                                                       //
      if (user != undefined) {                                                                                         // 11
        return true;                                                                                                   // 12
      }                                                                                                                // 13
                                                                                                                       //
      return false;                                                                                                    // 14
    },                                                                                                                 // 15
    checkCaptcha: function (captchaData) {                                                                             // 16
      var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData); //console.log(verifyCaptchaResponse);
                                                                                                                       //
      if (!verifyCaptchaResponse.success) {                                                                            // 20
        //console.log('reCAPTCHA check failed!', verifyCaptchaResponse);                                               // 21
        throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + (verifyCaptchaResponse.error || "Timeout or duplicate"));   // 22
        return false;                                                                                                  // 23
      } else {                                                                                                         // 24
        //console.log('reCAPTCHA verification passed!');                                                               // 25
        return true;                                                                                                   // 26
      }                                                                                                                // 27
    },                                                                                                                 // 28
    "checkLoginRoot": function (user, email) {                                                                         // 29
      var rootUs = Meteor.users.findOne({                                                                              // 30
        _id: this.userId,                                                                                              // 30
        username: 'root',                                                                                              // 30
        'emails.address': 'root@gmail.com'                                                                             // 30
      });                                                                                                              // 30
                                                                                                                       //
      if (rootUs != undefined) {                                                                                       // 31
        Roles.addUsersToRoles(this.userId, ['root']);                                                                  // 32
        return true;                                                                                                   // 33
      }                                                                                                                // 34
                                                                                                                       //
      return false;                                                                                                    // 35
    },                                                                                                                 // 36
    checkRol: function () {                                                                                            // 37
      if (Roles.userIsInRole(this.userId, 'root')) {                                                                   // 38
        return {                                                                                                       // 39
          tipo: 'root'                                                                                                 // 39
        };                                                                                                             // 39
      }                                                                                                                // 40
                                                                                                                       //
      if (Roles.userIsInRole(this.userId, 'admin')) {                                                                  // 41
        return {                                                                                                       // 42
          tipo: 'admin'                                                                                                // 42
        };                                                                                                             // 42
      }                                                                                                                // 43
                                                                                                                       //
      return {                                                                                                         // 44
        tipo: 'normal'                                                                                                 // 44
      };                                                                                                               // 44
    },                                                                                                                 // 45
    setRol: function (rol, idUser) {                                                                                   // 46
      //is in role falta                                                                                               // 47
      Roles.addUsersToRoles(idUser, [rol]); //console.log(idUser+'---'+rol);                                           // 48
    },                                                                                                                 // 50
    changeRol: function (rol, idUser) {                                                                                // 51
      //is in role falta                                                                                               // 52
      Roles.setUserRoles(idUser, [rol]); //console.log(idUser+'---'+rol);                                              // 53
                                                                                                                       //
      return true;                                                                                                     // 55
    },                                                                                                                 // 56
    ///////// SITIO METHODS BEGIN                                                                                      // 57
    checkSitio: function (titulo) {                                                                                    // 58
      var sitio = SITIO.findOne({                                                                                      // 59
        titulo: titulo                                                                                                 // 59
      });                                                                                                              // 59
                                                                                                                       //
      if (sitio == undefined + 1) {                                                                                    // 60
        return true;                                                                                                   // 61
      }                                                                                                                // 62
                                                                                                                       //
      return false;                                                                                                    // 63
    },                                                                                                                 // 64
    checkIfExistSitio: function (titulo) {                                                                             // 65
      var sitio = SITIO.findOne({                                                                                      // 66
        titulo: titulo                                                                                                 // 66
      });                                                                                                              // 66
                                                                                                                       //
      if (sitio != undefined) {                                                                                        // 67
        return true;                                                                                                   // 68
      }                                                                                                                // 69
                                                                                                                       //
      return false;                                                                                                    // 70
    },                                                                                                                 // 71
    checkIfExistMenu: function (link) {                                                                                // 72
      var menu = MENU.findOne({                                                                                        // 73
        link: link                                                                                                     // 73
      });                                                                                                              // 73
                                                                                                                       //
      if (menu != undefined) {                                                                                         // 74
        return true;                                                                                                   // 75
      }                                                                                                                // 76
                                                                                                                       //
      return false;                                                                                                    // 77
    },                                                                                                                 // 78
    insertSitio: function (obj) {                                                                                      // 79
      var response = 'error en la insercion';                                                                          // 80
      return SITIO.insert(obj, function (error, result) {                                                              // 81
        if (result) {                                                                                                  // 82
          HEADER.insert({                                                                                              // 83
            idSitio: result,                                                                                           // 84
            titulo: obj.carrera,                                                                                       // 84
            subtitulo: 'Subtitulo del Sitio',                                                                          // 84
            tipoFondo: 'ninguno',                                                                                      // 84
            fondo: 'ninguno',                                                                                          // 85
            fuente: 'Arial',                                                                                           // 85
            logo1: 'logo1.jpg',                                                                                        // 85
            logo2: 'logo2.jpg',                                                                                        // 85
            posicion: 'up',                                                                                            // 85
            tipo: 'default'                                                                                            // 85
          });                                                                                                          // 83
          NAVBAR.insert({                                                                                              // 87
            idSitio: result,                                                                                           // 87
            color: 'seablue',                                                                                          // 87
            fuente: 'Arial'                                                                                            // 87
          });                                                                                                          // 87
          MENU.insert({                                                                                                // 88
            nombre: "INICIO",                                                                                          // 88
            link: "/",                                                                                                 // 88
            tipo: 'normal',                                                                                            // 88
            idSitio: result,                                                                                           // 88
            estado: "activo",                                                                                          // 88
            contenido: "Si"                                                                                            // 88
          });                                                                                                          // 88
          MENU.insert({                                                                                                // 89
            nombre: "EVENTOS",                                                                                         // 89
            link: "eventos",                                                                                           // 89
            tipo: 'normal',                                                                                            // 89
            idSitio: result,                                                                                           // 89
            estado: "activo",                                                                                          // 89
            contenido: "Si"                                                                                            // 89
          });                                                                                                          // 89
          MENU.insert({                                                                                                // 90
            nombre: "BOLETINES",                                                                                       // 90
            link: "boletines",                                                                                         // 90
            tipo: 'normal',                                                                                            // 90
            idSitio: result,                                                                                           // 90
            estado: "activo",                                                                                          // 90
            contenido: "Si"                                                                                            // 90
          });                                                                                                          // 90
          CUERPO.insert({                                                                                              // 91
            idSitio: result,                                                                                           // 91
            tipoFondo: 'color',                                                                                        // 91
            fondo: '#f5f6f8'                                                                                           // 91
          });                                                                                                          // 91
          SIDEBARMENU.insert({                                                                                         // 92
            idSitio: result,                                                                                           // 93
            tipoFondo: 'color',                                                                                        // 93
            fondo: 'seablue',                                                                                          // 93
            fuente: 'Times New Roman',                                                                                 // 93
            tipo: 'default',                                                                                           // 93
            html: '<div>Sidebar Personalizado </div>'                                                                  // 93
          });                                                                                                          // 92
          FOOTER.insert({                                                                                              // 95
            idSitio: result,                                                                                           // 96
            fuente: 'Arial',                                                                                           // 96
            texto: obj.carrera + ' ' + new Date().getFullYear(),                                                       // 96
            tipo: 'default',                                                                                           // 96
            html: '<div>Footer Personalizado </div>'                                                                   // 96
          });                                                                                                          // 95
          BANNER.insert({                                                                                              // 98
            idSitio: result,                                                                                           // 99
            tipo: 'texto e imagen',                                                                                    // 99
            texto: obj.carrera,                                                                                        // 100
            imagen: '/students.jpg',                                                                                   // 100
            textoPersonalizado: '<div class="bg-primary p-5 m-5" style="height:25vw"><span class="text-white">Texto Personalizado </span></div>'
          });                                                                                                          // 98
          response = "Se creó el Sitio Web";                                                                           // 103
        }                                                                                                              // 104
                                                                                                                       //
        if (error) {                                                                                                   // 105
          console.log(error);                                                                                          // 106
        }                                                                                                              // 107
                                                                                                                       //
        return response;                                                                                               // 108
      });                                                                                                              // 109
    },                                                                                                                 // 110
    checkSiteRoute: function (idSitio) {                                                                               // 111
      if (Roles.userIsInRole(this.userId, 'admin')) {                                                                  // 113
        var sitioAdmin = SITIO.findOne({                                                                               // 114
          admin: this.userId,                                                                                          // 114
          _id: idSitio                                                                                                 // 114
        });                                                                                                            // 114
                                                                                                                       //
        if (sitioAdmin != undefined) {                                                                                 // 115
          return {                                                                                                     // 116
            check: true                                                                                                // 116
          };                                                                                                           // 116
        }                                                                                                              // 117
                                                                                                                       //
        return {                                                                                                       // 118
          check: false,                                                                                                // 118
          rol: 'admin'                                                                                                 // 118
        };                                                                                                             // 118
      }                                                                                                                // 119
                                                                                                                       //
      if (Roles.userIsInRole(this.userId, 'root')) {                                                                   // 120
        var sitio = SITIO.findOne({                                                                                    // 121
          _id: idSitio                                                                                                 // 121
        });                                                                                                            // 121
        var sitioExist = false;                                                                                        // 123
                                                                                                                       //
        if (sitio != undefined) {                                                                                      // 125
          sitioExist = true;                                                                                           // 126
        }                                                                                                              // 127
                                                                                                                       //
        return {                                                                                                       // 128
          check: sitioExist,                                                                                           // 128
          rol: 'root'                                                                                                  // 128
        };                                                                                                             // 128
      }                                                                                                                // 129
                                                                                                                       //
      return {                                                                                                         // 130
        check: false,                                                                                                  // 130
        rol: ''                                                                                                        // 130
      };                                                                                                               // 130
    },                                                                                                                 // 132
    redirectUser: function () {                                                                                        // 133
      if (Roles.userIsInRole(this.userId, 'admin')) {                                                                  // 136
        return {                                                                                                       // 138
          res: true,                                                                                                   // 138
          rol: 'admin'                                                                                                 // 138
        };                                                                                                             // 138
      }                                                                                                                // 139
                                                                                                                       //
      if (Roles.userIsInRole(this.userId, 'root')) {                                                                   // 140
        return {                                                                                                       // 142
          res: true,                                                                                                   // 142
          rol: 'root'                                                                                                  // 142
        };                                                                                                             // 142
      }                                                                                                                // 143
                                                                                                                       //
      return {                                                                                                         // 144
        res: false,                                                                                                    // 144
        rol: ''                                                                                                        // 144
      };                                                                                                               // 144
    },                                                                                                                 // 145
    checkRolRoot: function () {                                                                                        // 146
      if (Roles.userIsInRole(this.userId, 'root')) {                                                                   // 147
        return {                                                                                                       // 149
          res: true                                                                                                    // 149
        };                                                                                                             // 149
      }                                                                                                                // 150
                                                                                                                       //
      if (Roles.userIsInRole(this.userId, 'admin')) {                                                                  // 151
        return {                                                                                                       // 153
          res: false,                                                                                                  // 153
          route: 'admin'                                                                                               // 153
        };                                                                                                             // 153
      }                                                                                                                // 154
                                                                                                                       //
      return {                                                                                                         // 155
        res: false,                                                                                                    // 155
        route: ''                                                                                                      // 155
      };                                                                                                               // 155
    },                                                                                                                 // 156
    trackUser: function (obj) {                                                                                        // 158
      //console.log(this.connection);                                                                                  // 159
      //ip = this.connection.clientAddress; en produccion                                                              // 160
      //console.log(JSON.parse('http://jsonip.com?callback=?'));                                                       // 161
      /*                                                                                                               // 163
      $.getJSON('http://jsonip.com?callback=?', function(json, textStatus) {                                           //
                                                                                                                       //
          console.log(json);                                                                                           //
      });*/ //return HTTP.get('http://jsonip.com?callback=?').data.ip;                                                 //
      var ipLocal = this.connection.clientAddress;                                                                     // 169
    },                                                                                                                 // 170
    crearUser: function (user, rol) {                                                                                  // 172
      var newUser = {                                                                                                  // 173
        username: user.username,                                                                                       // 174
        password: user.password,                                                                                       // 175
        email: user.email,                                                                                             // 176
        profile: {                                                                                                     // 177
          name: user.name,                                                                                             // 178
          surname: user.surname,                                                                                       // 179
          carrera: user.carrera,                                                                                       // 180
          online: true,                                                                                                // 181
          bloqueado: false,                                                                                            // 182
          img: 'none'                                                                                                  // 183
        }                                                                                                              // 177
      };                                                                                                               // 173
      var account = Accounts.createUser(newUser);                                                                      // 186
                                                                                                                       //
      if (account) {                                                                                                   // 187
        Roles.addUsersToRoles(account, [rol]);                                                                         // 188
      }                                                                                                                // 189
                                                                                                                       //
      return account;                                                                                                  // 190
    },                                                                                                                 // 191
    darEstado: function (id, estado) {                                                                                 // 192
      return SITIO.update({                                                                                            // 193
        _id: id                                                                                                        // 193
      }, {                                                                                                             // 193
        $set: {                                                                                                        // 193
          estado: estado                                                                                               // 193
        }                                                                                                              // 193
      });                                                                                                              // 193
    },                                                                                                                 // 194
    changeAdmin: function (sitio, set) {                                                                               // 195
      return SITIO.update(sitio, {                                                                                     // 196
        $set: set                                                                                                      // 196
      }); //console.log(change);                                                                                       // 196
    },                                                                                                                 // 199
    setNewPassword: function (userId, newPassword) {                                                                   // 200
      Accounts.setPassword(userId, newPassword, {                                                                      // 202
        logout: false                                                                                                  // 202
      });                                                                                                              // 202
      return true;                                                                                                     // 203
    },                                                                                                                 // 204
    editUser: function (id, obj) {                                                                                     // 205
      //console.log(id);                                                                                               // 206
      return Accounts.users.update({                                                                                   // 207
        _id: id                                                                                                        // 207
      }, {                                                                                                             // 207
        $set: obj                                                                                                      // 207
      });                                                                                                              // 207
    },                                                                                                                 // 208
    ////////SITIO METHODS BEGIN//////////                                                                              // 209
    ////////HEADER METHODS BEGIN//////////                                                                             // 211
    editHeader: function (id, obj) {                                                                                   // 213
      return HEADER.update({                                                                                           // 214
        _id: id                                                                                                        // 214
      }, {                                                                                                             // 214
        $set: obj                                                                                                      // 214
      });                                                                                                              // 214
    },                                                                                                                 // 215
    ////////HEADER METHODS END//////////                                                                               // 217
    ////////BANNER METHODS BEGIN//////////                                                                             // 218
    bannerChange: function (id, obj) {                                                                                 // 219
      if (obj.tipo == 'carrusel') {                                                                                    // 220
        var carrusel = CARROUSEL.findOne({                                                                             // 221
          idSitio: id                                                                                                  // 221
        });                                                                                                            // 221
                                                                                                                       //
        if (carrusel == undefined) {                                                                                   // 222
          CARROUSEL.insert({                                                                                           // 223
            idSitio: id,                                                                                               // 224
            titulo: 'Titulo',                                                                                          // 224
            texto: 'Algun texto',                                                                                      // 224
            imagen: '/students.jpg',                                                                                   // 224
            link: ''                                                                                                   // 224
          });                                                                                                          // 223
          CARROUSEL.insert({                                                                                           // 226
            idSitio: id,                                                                                               // 227
            titulo: 'Titulo',                                                                                          // 227
            texto: 'Algun texto',                                                                                      // 227
            imagen: '/graduacion.jpg',                                                                                 // 227
            link: ''                                                                                                   // 227
          });                                                                                                          // 226
        }                                                                                                              // 229
      }                                                                                                                // 230
                                                                                                                       //
      return BANNER.update({                                                                                           // 231
        idSitio: id                                                                                                    // 231
      }, {                                                                                                             // 231
        $set: obj                                                                                                      // 231
      });                                                                                                              // 231
    },                                                                                                                 // 232
    insertCarrusel: function (obj) {                                                                                   // 233
      var response = 'error'; //console.log(contador);                                                                 // 234
                                                                                                                       //
      return CARROUSEL.insert(obj, function (e, r) {                                                                   // 236
        if (e) {                                                                                                       // 237
          response = e;                                                                                                // 238
          console.log(e);                                                                                              // 239
        }                                                                                                              // 240
                                                                                                                       //
        if (r) {                                                                                                       // 240
          response = r;                                                                                                // 241
          console.log(r);                                                                                              // 242
        }                                                                                                              // 243
                                                                                                                       //
        return response;                                                                                               // 244
      });                                                                                                              // 245
    },                                                                                                                 // 246
    editCarrusel: function (id, obj) {                                                                                 // 247
      return CARROUSEL.update({                                                                                        // 248
        _id: id                                                                                                        // 248
      }, {                                                                                                             // 248
        $set: obj                                                                                                      // 248
      });                                                                                                              // 248
    },                                                                                                                 // 249
    editBannerHtml: function (id, html) {                                                                              // 250
      return BANNER.update({                                                                                           // 251
        _id: id                                                                                                        // 251
      }, {                                                                                                             // 251
        $set: {                                                                                                        // 251
          textoPersonalizado: html                                                                                     // 251
        }                                                                                                              // 251
      });                                                                                                              // 251
    },                                                                                                                 // 252
    editBanner: function (id, obj) {                                                                                   // 253
      return BANNER.update({                                                                                           // 254
        _id: id                                                                                                        // 254
      }, {                                                                                                             // 254
        $set: obj                                                                                                      // 254
      });                                                                                                              // 254
    },                                                                                                                 // 255
    ////////BANNER METHODS END//////////                                                                               // 256
    ////////NAVBAR METHODS BEGIN//////////                                                                             // 257
    navbarChange: function (id, obj) {                                                                                 // 258
      return NAVBAR.update({                                                                                           // 259
        idSitio: id                                                                                                    // 259
      }, {                                                                                                             // 259
        $set: obj                                                                                                      // 259
      });                                                                                                              // 259
    },                                                                                                                 // 260
    insertMenu: function (obj) {                                                                                       // 261
      var res = 'error';                                                                                               // 262
      return MENU.insert(obj, function (error, result) {                                                               // 263
        if (result) {                                                                                                  // 264
          res = 'se inserto el menu';                                                                                  // 265
        }                                                                                                              // 266
                                                                                                                       //
        return res;                                                                                                    // 267
      });                                                                                                              // 268
    },                                                                                                                 // 269
    editMenu: function (id, obj) {                                                                                     // 270
      return MENU.update({                                                                                             // 271
        _id: id                                                                                                        // 271
      }, {                                                                                                             // 271
        $set: obj                                                                                                      // 271
      });                                                                                                              // 271
    },                                                                                                                 // 272
    darEstadoMenu: function (id, estado) {                                                                             // 273
      return MENU.update({                                                                                             // 274
        _id: id                                                                                                        // 274
      }, {                                                                                                             // 274
        $set: {                                                                                                        // 274
          estado: estado                                                                                               // 274
        }                                                                                                              // 274
      });                                                                                                              // 274
    },                                                                                                                 // 275
    darEstadoSubmenu: function (id, estado) {                                                                          // 276
      return SUBMENU.update({                                                                                          // 277
        _id: id                                                                                                        // 277
      }, {                                                                                                             // 277
        $set: {                                                                                                        // 277
          estado: estado                                                                                               // 277
        }                                                                                                              // 277
      });                                                                                                              // 277
    },                                                                                                                 // 278
    insSubmenu: function (obj) {                                                                                       // 279
      var response = 'error';                                                                                          // 281
      return SUBMENU.insert(obj, function (e, r) {                                                                     // 282
        if (e) {                                                                                                       // 283
          response = e;                                                                                                // 284
        }                                                                                                              // 285
                                                                                                                       //
        if (r) {                                                                                                       // 285
          response = r;                                                                                                // 286
        }                                                                                                              // 287
                                                                                                                       //
        return response;                                                                                               // 288
      });                                                                                                              // 289
    },                                                                                                                 // 290
    editSubmenu: function (id, obj) {                                                                                  // 291
      return SUBMENU.update({                                                                                          // 293
        _id: id                                                                                                        // 293
      }, {                                                                                                             // 293
        $set: obj                                                                                                      // 293
      });                                                                                                              // 293
    },                                                                                                                 // 294
    ////////NAVBAR METHODS END//////////                                                                               // 295
    ////////CONTENT METHODS BEGIN//////////                                                                            // 296
    changeColorBody: function (idSitio, color) {                                                                       // 297
      return CUERPO.update({                                                                                           // 298
        idSitio: idSitio                                                                                               // 298
      }, {                                                                                                             // 298
        $set: {                                                                                                        // 298
          fondo: color                                                                                                 // 298
        }                                                                                                              // 298
      });                                                                                                              // 298
    },                                                                                                                 // 299
    insContent: function (obj) {                                                                                       // 300
      var response = 'error';                                                                                          // 301
      return CONTENIDO.insert(obj, function (e, r) {                                                                   // 302
        if (e) {                                                                                                       // 303
          response = e;                                                                                                // 304
          console.log(e);                                                                                              // 305
        }                                                                                                              // 306
                                                                                                                       //
        if (r) {                                                                                                       // 306
          console.log(r);                                                                                              // 307
          response = "Se inserto el contenido";                                                                        // 308
          MENU.update({                                                                                                // 309
            _id: obj.idMenu                                                                                            // 309
          }, {                                                                                                         // 309
            $set: {                                                                                                    // 309
              contenido: 'Si'                                                                                          // 309
            }                                                                                                          // 309
          });                                                                                                          // 309
        }                                                                                                              // 310
                                                                                                                       //
        return response;                                                                                               // 311
      });                                                                                                              // 312
    },                                                                                                                 // 313
    editContent: function (idCont, obj) {                                                                              // 314
      return CONTENIDO.update({                                                                                        // 315
        _id: idCont                                                                                                    // 315
      }, {                                                                                                             // 315
        $set: obj                                                                                                      // 315
      });                                                                                                              // 315
    },                                                                                                                 // 316
    visibilityContent: function (idCont, obj) {                                                                        // 317
      return CONTENIDO.update({                                                                                        // 318
        _id: idCont                                                                                                    // 318
      }, {                                                                                                             // 318
        $set: obj                                                                                                      // 318
      });                                                                                                              // 318
    },                                                                                                                 // 319
    insComentario: function (obj) {                                                                                    // 321
      return COMENTARIO.insert(obj);                                                                                   // 322
    },                                                                                                                 // 323
    banComentUser: function () {                                                                                       // 324
      Accounts.users.update({                                                                                          // 325
        _id: this.userId                                                                                               // 325
      }, {                                                                                                             // 325
        $set: {                                                                                                        // 325
          'profile.bloqueado': true                                                                                    // 325
        }                                                                                                              // 325
      });                                                                                                              // 325
    },                                                                                                                 // 326
    ////////CONTENT METHODS END//////////                                                                              // 328
    ////////SIDEBAR METHODS BEGIN//////////                                                                            // 329
    sidebarChange: function (idSitio, obj) {                                                                           // 330
      return SIDEBARMENU.update({                                                                                      // 331
        idSitio: idSitio                                                                                               // 331
      }, {                                                                                                             // 331
        $set: obj                                                                                                      // 331
      });                                                                                                              // 331
    },                                                                                                                 // 332
    editsidebarHtml: function (idSitio, obj) {                                                                         // 333
      return SIDEBARMENU.update({                                                                                      // 334
        idSitio: idSitio                                                                                               // 334
      }, {                                                                                                             // 334
        $set: obj                                                                                                      // 334
      });                                                                                                              // 334
    },                                                                                                                 // 335
    insMenuEnlace: function (obj) {                                                                                    // 336
      var contador = MENUENLACE.find({                                                                                 // 337
        idSitio: obj.idSitio                                                                                           // 337
      }).count();                                                                                                      // 337
      var response = 'error';                                                                                          // 338
      return MENUENLACE.insert({                                                                                       // 339
        idSitio: obj.idSitio,                                                                                          // 340
        nombre: obj.nombre,                                                                                            // 340
        posicion: contador + 1,                                                                                        // 340
        estado: 'Activo'                                                                                               // 340
      }, function (e, r) {                                                                                             // 339
        if (e) {                                                                                                       // 342
          console.log(e);                                                                                              // 343
        }                                                                                                              // 344
                                                                                                                       //
        if (r) {                                                                                                       // 344
          response = r;                                                                                                // 345
        }                                                                                                              // 346
                                                                                                                       //
        return response;                                                                                               // 347
      });                                                                                                              // 348
    },                                                                                                                 // 349
    darEstadoSidebar: function (id, estado) {                                                                          // 350
      return MENUENLACE.update({                                                                                       // 351
        _id: id                                                                                                        // 351
      }, {                                                                                                             // 351
        $set: {                                                                                                        // 351
          estado: estado                                                                                               // 351
        }                                                                                                              // 351
      });                                                                                                              // 351
    },                                                                                                                 // 352
    insEnlace: function (obj) {                                                                                        // 355
      var response = 'error';                                                                                          // 356
      return ENLACE.insert(obj, function (e, r) {                                                                      // 357
        if (e) {                                                                                                       // 358
          response = e;                                                                                                // 359
          console.log(e);                                                                                              // 360
        }                                                                                                              // 361
                                                                                                                       //
        if (r) {                                                                                                       // 361
          response = r; //console.log(r);                                                                              // 362
        }                                                                                                              // 364
                                                                                                                       //
        return response;                                                                                               // 365
      });                                                                                                              // 366
    },                                                                                                                 // 367
    editmenuenlace: function (nombre, idmenu) {                                                                        // 368
      return MENUENLACE.update({                                                                                       // 370
        _id: idmenu                                                                                                    // 370
      }, {                                                                                                             // 370
        $set: {                                                                                                        // 370
          nombre: nombre                                                                                               // 370
        }                                                                                                              // 370
      });                                                                                                              // 370
    },                                                                                                                 // 371
    editEnlace: function (obj, idenlace) {                                                                             // 372
      return ENLACE.update({                                                                                           // 374
        _id: idenlace                                                                                                  // 374
      }, {                                                                                                             // 374
        $set: obj                                                                                                      // 374
      });                                                                                                              // 374
    },                                                                                                                 // 375
    eliEnlace: function (idenlace) {                                                                                   // 376
      var response = false;                                                                                            // 377
      return ENLACE.remove({                                                                                           // 378
        _id: idenlace                                                                                                  // 378
      });                                                                                                              // 378
    },                                                                                                                 // 379
    //////// SIDEBAR METHODS END //////////                                                                            // 381
    ////////FOOTER METHODS BEGIN//////////                                                                             // 383
    editFooter: function (texto, idfooter) {                                                                           // 384
      return FOOTER.update({                                                                                           // 386
        _id: idfooter                                                                                                  // 386
      }, {                                                                                                             // 386
        $set: {                                                                                                        // 386
          texto: texto                                                                                                 // 386
        }                                                                                                              // 386
      });                                                                                                              // 386
    },                                                                                                                 // 387
    editFooterHtml: function (idSitio, obj) {                                                                          // 388
      return FOOTER.update({                                                                                           // 390
        idSitio: idSitio                                                                                               // 390
      }, {                                                                                                             // 390
        $set: obj                                                                                                      // 390
      });                                                                                                              // 390
    },                                                                                                                 // 391
    footerChange: function (id, obj) {                                                                                 // 392
      return FOOTER.update({                                                                                           // 393
        idSitio: id                                                                                                    // 393
      }, {                                                                                                             // 393
        $set: obj                                                                                                      // 393
      });                                                                                                              // 393
    },                                                                                                                 // 394
    insLinkFooter: function (obj) {                                                                                    // 395
      var response = 'error';                                                                                          // 396
      return FOOTERLINKS.insert(obj, function (e, r) {                                                                 // 397
        if (e) {                                                                                                       // 398
          response = e;                                                                                                // 399
          console.log(e);                                                                                              // 400
        }                                                                                                              // 401
                                                                                                                       //
        if (r) {                                                                                                       // 401
          response = r; //console.log(r);                                                                              // 402
        }                                                                                                              // 404
                                                                                                                       //
        return response;                                                                                               // 405
      });                                                                                                              // 406
    },                                                                                                                 // 407
    editLinkFooter: function (idlink, obj) {                                                                           // 408
      return FOOTERLINKS.update({                                                                                      // 409
        _id: idlink                                                                                                    // 409
      }, {                                                                                                             // 409
        $set: obj                                                                                                      // 409
      });                                                                                                              // 409
    },                                                                                                                 // 410
    eliLinkFooter: function (idlink) {                                                                                 // 411
      return FOOTERLINKS.remove({                                                                                      // 412
        _id: idlink                                                                                                    // 412
      });                                                                                                              // 412
    },                                                                                                                 // 413
    //////// SITE METHODS BEGIN //////////                                                                             // 414
    insComentario: function (obj) {                                                                                    // 415
      var response = 'error';                                                                                          // 416
      return COMENTARIO.insert(obj, function (e, r) {                                                                  // 417
        if (e) {                                                                                                       // 418
          console.log(e);                                                                                              // 419
        }                                                                                                              // 420
                                                                                                                       //
        if (r) {                                                                                                       // 420
          response = r; //console.log(r);                                                                              // 421
        }                                                                                                              // 423
                                                                                                                       //
        return response;                                                                                               // 424
      });                                                                                                              // 425
    } ////////SITE METHODS END//////////                                                                               // 426
                                                                                                                       //
  });                                                                                                                  // 8
});                                                                                                                    // 432
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"publications.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/publications.js                                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
var publishComposite = void 0;                                                                                         // 1
module.watch(require("meteor/reywood:publish-composite"), {                                                            // 1
  publishComposite: function (v) {                                                                                     // 1
    publishComposite = v;                                                                                              // 1
  }                                                                                                                    // 1
}, 1);                                                                                                                 // 1
Meteor.startup(function () {                                                                                           // 4
  // code to run on server at startup                                                                                  // 5
  //Publicaciones de ROOT                                                                                              // 6
  Meteor.publish("getSitios", function () {                                                                            // 7
    return SITIO.find();                                                                                               // 8
  });                                                                                                                  // 9
  Meteor.publish("getUsers", function () {                                                                             // 10
    return Meteor.users.find();                                                                                        // 11
  }); //Publicaciones de ADMIN                                                                                         // 12
                                                                                                                       //
  Meteor.publish("getSitiosAdmin", function (admin) {                                                                  // 14
    return SITIO.find({                                                                                                // 15
      admin: admin                                                                                                     // 15
    });                                                                                                                // 15
  });                                                                                                                  // 17
  Meteor.publish("getSitio", function (idSitio) {                                                                      // 18
    return SITIO.find({                                                                                                // 19
      _id: idSitio                                                                                                     // 19
    });                                                                                                                // 19
  });                                                                                                                  // 20
  Meteor.publish("getHeader", function (idSitio) {                                                                     // 22
    return HEADER.find({                                                                                               // 23
      idSitio: idSitio                                                                                                 // 23
    });                                                                                                                // 23
  });                                                                                                                  // 25
  Meteor.publish("getBanner", function (idSitio) {                                                                     // 26
    return BANNER.find({                                                                                               // 27
      idSitio: idSitio                                                                                                 // 27
    });                                                                                                                // 27
  });                                                                                                                  // 29
  Meteor.publish("getCarrusel", function (idSitio) {                                                                   // 30
    return CARROUSEL.find({                                                                                            // 31
      idSitio: idSitio                                                                                                 // 31
    });                                                                                                                // 31
  });                                                                                                                  // 33
  Meteor.publish("getSidebar", function (idSitio) {                                                                    // 35
    return SIDEBARMENU.find({                                                                                          // 36
      idSitio: idSitio                                                                                                 // 36
    });                                                                                                                // 36
  });                                                                                                                  // 38
  Meteor.publish("getMenu", function (idSitio) {                                                                       // 39
    return MENU.find({                                                                                                 // 40
      idSitio: idSitio                                                                                                 // 40
    });                                                                                                                // 40
  });                                                                                                                  // 42
  Meteor.publish("getNavbar", function (idSitio) {                                                                     // 44
    return NAVBAR.find({                                                                                               // 45
      idSitio: idSitio                                                                                                 // 45
    });                                                                                                                // 45
  });                                                                                                                  // 46
  Meteor.publish("getCuerpo", function (idSitio) {                                                                     // 47
    return CUERPO.find({                                                                                               // 48
      idSitio: idSitio                                                                                                 // 48
    });                                                                                                                // 48
  });                                                                                                                  // 49
  Meteor.publish("getMenuEnlace", function (idSitio) {                                                                 // 50
    return MENUENLACE.find({                                                                                           // 51
      idSitio: idSitio                                                                                                 // 51
    });                                                                                                                // 51
  });                                                                                                                  // 52
  Meteor.publish("getEnlaces", function (idMenu) {                                                                     // 54
    return ENLACE.find({                                                                                               // 55
      idMenu: idMenu                                                                                                   // 55
    });                                                                                                                // 55
  });                                                                                                                  // 56
  Meteor.publish("getFooter", function (idSitio) {                                                                     // 57
    //console.log(idSitio);                                                                                            // 58
    return FOOTER.find({                                                                                               // 59
      idSitio: idSitio                                                                                                 // 59
    });                                                                                                                // 59
  });                                                                                                                  // 60
  Meteor.publish("getFooterLinks", function (idSitio) {                                                                // 61
    //console.log(idSitio);                                                                                            // 62
    return FOOTERLINKS.find({                                                                                          // 63
      idSitio: idSitio                                                                                                 // 63
    });                                                                                                                // 63
  });                                                                                                                  // 64
  Meteor.publish("getSubmenu", function (idSitio) {                                                                    // 65
    //console.log(idSitio);                                                                                            // 66
    return SUBMENU.find({                                                                                              // 67
      idSitio: idSitio                                                                                                 // 67
    });                                                                                                                // 67
  });                                                                                                                  // 68
  Meteor.publish("getContenidos", function (idMenu) {                                                                  // 69
    //console.log(idMenu);                                                                                             // 70
    return CONTENIDO.find({                                                                                            // 71
      idMenu: idMenu                                                                                                   // 71
    });                                                                                                                // 71
  });                                                                                                                  // 72
  Meteor.publish("getContenido", function (idCont) {                                                                   // 73
    //console.log(idMenu);                                                                                             // 74
    return CONTENIDO.find({                                                                                            // 75
      _id: idCont                                                                                                      // 75
    });                                                                                                                // 75
  });                                                                                                                  // 76
  Meteor.publish("getOneMenu", function (idMenu) {                                                                     // 77
    return MENU.find({                                                                                                 // 78
      _id: idMenu                                                                                                      // 78
    });                                                                                                                // 78
  });                                                                                                                  // 80
  Meteor.publish("getOneSubmenu", function (idSubMenu) {                                                               // 81
    return SUBMENU.find({                                                                                              // 83
      _id: idSubMenu                                                                                                   // 83
    });                                                                                                                // 83
  });                                                                                                                  // 84
  Meteor.publish("getImages", function (idSitio) {                                                                     // 85
    return IMAGES.find({                                                                                               // 86
      'meta.idSitio': idSitio                                                                                          // 86
    }).cursor;                                                                                                         // 86
  });                                                                                                                  // 87
  Meteor.publish("getVideos", function (idSitio) {                                                                     // 88
    return VIDEOS.find({                                                                                               // 89
      'meta.idSitio': idSitio                                                                                          // 89
    }).cursor;                                                                                                         // 89
  });                                                                                                                  // 90
  Meteor.publish("getArchivos", function (idSitio) {                                                                   // 91
    return ARCHIVOS.find({                                                                                             // 92
      'meta.idSitio': idSitio                                                                                          // 92
    }).cursor;                                                                                                         // 92
  }); /////// Publicaciones de user                                                                                    // 93
                                                                                                                       //
  Meteor.publish("getSitioClient", function (sitio) {                                                                  // 95
    return SITIO.find({                                                                                                // 96
      titulo: sitio                                                                                                    // 96
    });                                                                                                                // 96
  });                                                                                                                  // 97
  Meteor.publish("getHeaderClient", function (titulo) {                                                                // 98
    var idSitio = SITIO.findOne({                                                                                      // 99
      titulo: titulo                                                                                                   // 99
    });                                                                                                                // 99
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 100
      return HEADER.find({                                                                                             // 101
        idSitio: idSitio._id                                                                                           // 101
      });                                                                                                              // 101
    }                                                                                                                  // 102
  });                                                                                                                  // 103
  Meteor.publish("getNavbarClient", function (titulo) {                                                                // 105
    var idSitio = SITIO.findOne({                                                                                      // 106
      titulo: titulo                                                                                                   // 106
    });                                                                                                                // 106
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 107
      return NAVBAR.find({                                                                                             // 108
        idSitio: idSitio._id                                                                                           // 108
      });                                                                                                              // 108
    }                                                                                                                  // 109
  });                                                                                                                  // 110
  Meteor.publish("getCarruselClient", function (titulo) {                                                              // 111
    var idSitio = SITIO.findOne({                                                                                      // 112
      titulo: titulo                                                                                                   // 112
    });                                                                                                                // 112
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 113
      return CARROUSEL.find({                                                                                          // 114
        idSitio: idSitio._id                                                                                           // 114
      });                                                                                                              // 114
    }                                                                                                                  // 115
  });                                                                                                                  // 116
  Meteor.publish("getBannerClient", function (titulo) {                                                                // 117
    var idSitio = SITIO.findOne({                                                                                      // 118
      titulo: titulo                                                                                                   // 118
    });                                                                                                                // 118
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 119
      return BANNER.find({                                                                                             // 120
        idSitio: idSitio._id                                                                                           // 120
      });                                                                                                              // 120
    }                                                                                                                  // 121
  });                                                                                                                  // 122
  Meteor.publish("getMenuClient", function (titulo) {                                                                  // 123
    var idSitio = SITIO.findOne({                                                                                      // 124
      titulo: titulo                                                                                                   // 124
    });                                                                                                                // 124
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 125
      return MENU.find({                                                                                               // 126
        idSitio: idSitio._id                                                                                           // 126
      });                                                                                                              // 126
    }                                                                                                                  // 127
  });                                                                                                                  // 129
  Meteor.publish("getCuerpoClient", function (titulo) {                                                                // 130
    //console.log(titulo);                                                                                             // 131
    var idSitio = SITIO.findOne({                                                                                      // 132
      titulo: titulo                                                                                                   // 132
    });                                                                                                                // 132
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 133
      //console.log(CUERPO.find({idSitio:idSitio._id}));                                                               // 134
      return CUERPO.find({                                                                                             // 135
        idSitio: idSitio._id                                                                                           // 135
      });                                                                                                              // 135
    }                                                                                                                  // 136
  });                                                                                                                  // 138
  Meteor.publish("getSidebarClient", function (titulo) {                                                               // 139
    var idSitio = SITIO.findOne({                                                                                      // 140
      titulo: titulo                                                                                                   // 140
    });                                                                                                                // 140
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 141
      return SIDEBARMENU.find({                                                                                        // 142
        idSitio: idSitio._id                                                                                           // 142
      });                                                                                                              // 142
    }                                                                                                                  // 143
  });                                                                                                                  // 144
  Meteor.publish("getSidebarMenuClient", function (titulo) {                                                           // 145
    var idSitio = SITIO.findOne({                                                                                      // 146
      titulo: titulo                                                                                                   // 146
    });                                                                                                                // 146
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 147
      return MENUENLACE.find({                                                                                         // 148
        idSitio: idSitio._id                                                                                           // 148
      });                                                                                                              // 148
    }                                                                                                                  // 149
  });                                                                                                                  // 151
  Meteor.publish("getMenuenlaceClient", function (titulo) {                                                            // 152
    var idSitio = SITIO.findOne({                                                                                      // 153
      titulo: titulo                                                                                                   // 153
    });                                                                                                                // 153
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 154
      return ENLACE.find({                                                                                             // 155
        idSitio: idSitio._id                                                                                           // 155
      });                                                                                                              // 155
    }                                                                                                                  // 156
  });                                                                                                                  // 158
  Meteor.publish("getFooterClient", function (titulo) {                                                                // 159
    var idSitio = SITIO.findOne({                                                                                      // 160
      titulo: titulo                                                                                                   // 160
    });                                                                                                                // 160
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 161
      return FOOTER.find({                                                                                             // 162
        idSitio: idSitio._id                                                                                           // 162
      });                                                                                                              // 162
    }                                                                                                                  // 163
  });                                                                                                                  // 165
  Meteor.publish("getFooterLinksClient", function (titulo) {                                                           // 166
    var idSitio = SITIO.findOne({                                                                                      // 167
      titulo: titulo                                                                                                   // 167
    });                                                                                                                // 167
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 168
      return FOOTERLINKS.find({                                                                                        // 169
        idSitio: idSitio._id                                                                                           // 169
      });                                                                                                              // 169
    }                                                                                                                  // 170
  });                                                                                                                  // 172
  Meteor.publish("getSubmenuClient", function (titulo) {                                                               // 173
    var idSitio = SITIO.findOne({                                                                                      // 174
      titulo: titulo                                                                                                   // 174
    });                                                                                                                // 174
                                                                                                                       //
    if (idSitio != undefined) {                                                                                        // 175
      return SUBMENU.find({                                                                                            // 176
        idSitio: idSitio._id                                                                                           // 176
      });                                                                                                              // 176
    }                                                                                                                  // 177
  });                                                                                                                  // 179
  Meteor.publish("getContenidosMenuClient", function (tituloSitio, linkMenu) {                                         // 181
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos         // 182
    var sitio = SITIO.findOne({                                                                                        // 184
      titulo: tituloSitio                                                                                              // 184
    }); //CONTRLAR INDEF                                                                                               // 184
                                                                                                                       //
    var menu = MENU.findOne({                                                                                          // 186
      link: linkMenu,                                                                                                  // 186
      idSitio: sitio._id                                                                                               // 186
    });                                                                                                                // 186
                                                                                                                       //
    if (menu != undefined && sitio != undefined) {                                                                     // 189
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());                                                      // 190
      return CONTENIDO.find({                                                                                          // 191
        idMenu: menu._id                                                                                               // 191
      });                                                                                                              // 191
    }                                                                                                                  // 193
  });                                                                                                                  // 194
  Meteor.publish("getContenidosSubmenuClient", function (tituloSitio, linkSubmenu) {                                   // 195
    //por el momento solo menus en el caso de ser submenus deberia hacerse de otra manera menu y submenu ambos         // 196
    var sitio = SITIO.findOne({                                                                                        // 198
      titulo: tituloSitio                                                                                              // 198
    }); //CONTRLAR INDEF                                                                                               // 198
                                                                                                                       //
    var submenu = SUBMENU.findOne({                                                                                    // 200
      link: linkSubmenu,                                                                                               // 200
      idSitio: sitio._id                                                                                               // 200
    });                                                                                                                // 200
                                                                                                                       //
    if (submenu != undefined && sitio != undefined) {                                                                  // 203
      //console.log(CONTENIDO.find({idMenu : menu._id}).fetch());                                                      // 204
      return CONTENIDO.find({                                                                                          // 205
        idMenu: submenu._id                                                                                            // 205
      });                                                                                                              // 205
    }                                                                                                                  // 207
  }); //RECIBIR NOMBRE PARAMETRO                                                                                       // 208
                                                                                                                       //
  Meteor.publish("getHomeContentClient1", function (titulo) {                                                          // 210
    var sitio = SITIO.findOne({                                                                                        // 211
      titulo: titulo                                                                                                   // 211
    });                                                                                                                // 211
                                                                                                                       //
    if (sitio != undefined) {                                                                                          // 212
      var menu = MENU.findOne({                                                                                        // 213
        nombre: "BOLETINES",                                                                                           // 213
        idSitio: sitio._id                                                                                             // 213
      });                                                                                                              // 213
      return CONTENIDO.find({                                                                                          // 214
        idSitio: sitio._id,                                                                                            // 214
        idMenu: menu._id,                                                                                              // 214
        visible: "visible"                                                                                             // 214
      }, {                                                                                                             // 214
        limit: 2                                                                                                       // 214
      });                                                                                                              // 214
    }                                                                                                                  // 215
  });                                                                                                                  // 216
  Meteor.publish("getHomeContentClient2", function (titulo) {                                                          // 217
    var sitio = SITIO.findOne({                                                                                        // 218
      titulo: titulo                                                                                                   // 218
    });                                                                                                                // 218
                                                                                                                       //
    if (sitio != undefined) {                                                                                          // 219
      var menu = MENU.findOne({                                                                                        // 220
        nombre: "EVENTOS",                                                                                             // 220
        idSitio: sitio._id                                                                                             // 220
      });                                                                                                              // 220
      return CONTENIDO.find({                                                                                          // 221
        idSitio: sitio._id,                                                                                            // 221
        idMenu: menu._id,                                                                                              // 221
        visible: "visible"                                                                                             // 221
      }, {                                                                                                             // 221
        limit: 4                                                                                                       // 221
      });                                                                                                              // 221
    }                                                                                                                  // 222
  });                                                                                                                  // 223
  Meteor.publish("getMContentClient", function (titulo, menu, contenido) {                                             // 224
    var sitio = SITIO.findOne({                                                                                        // 225
      titulo: titulo                                                                                                   // 225
    });                                                                                                                // 225
                                                                                                                       //
    if (sitio != undefined) {                                                                                          // 226
      var menu = MENU.findOne({                                                                                        // 227
        link: menu,                                                                                                    // 227
        idSitio: sitio._id                                                                                             // 227
      });                                                                                                              // 227
      return CONTENIDO.find({                                                                                          // 228
        idSitio: sitio._id,                                                                                            // 228
        idMenu: menu._id,                                                                                              // 228
        ruta: contenido                                                                                                // 228
      });                                                                                                              // 228
    }                                                                                                                  // 229
  });                                                                                                                  // 230
  Meteor.publish("getSContentClient", function (titulo, submenu, contenido) {                                          // 232
    var sitio = SITIO.findOne({                                                                                        // 233
      titulo: titulo                                                                                                   // 233
    });                                                                                                                // 233
                                                                                                                       //
    if (sitio != undefined) {                                                                                          // 235
      var submenu = SUBMENU.findOne({                                                                                  // 236
        link: submenu,                                                                                                 // 236
        idSitio: sitio._id                                                                                             // 236
      });                                                                                                              // 236
      return CONTENIDO.find({                                                                                          // 237
        idSitio: sitio._id,                                                                                            // 237
        idMenu: submenu._id,                                                                                           // 237
        ruta: contenido                                                                                                // 237
      });                                                                                                              // 237
    }                                                                                                                  // 238
  });                                                                                                                  // 239
  publishComposite("getComentsClient", function (titulo, link, ruta, tipoMenu) {                                       // 240
    var sitio = SITIO.findOne({                                                                                        // 242
      titulo: titulo                                                                                                   // 242
    });                                                                                                                // 242
    var menu;                                                                                                          // 244
    var content = undefined; //console.log(sitio._id +' sitio --'+ tipoMenu);                                          // 246
                                                                                                                       //
    if (tipoMenu == 'menu') {                                                                                          // 249
      menu = MENU.findOne({                                                                                            // 250
        link: link,                                                                                                    // 250
        idSitio: sitio._id                                                                                             // 250
      });                                                                                                              // 250
    } else if (tipoMenu == 'submenu') {                                                                                // 251
      menu = SUBMENU.findOne({                                                                                         // 253
        link: link,                                                                                                    // 253
        idSitio: sitio._id                                                                                             // 253
      });                                                                                                              // 253
    } //console.log(menu.idSitio +' res');                                                                             // 254
                                                                                                                       //
                                                                                                                       //
    if (sitio != undefined && menu != undefined) {                                                                     // 257
      content = CONTENIDO.findOne({                                                                                    // 258
        ruta: ruta,                                                                                                    // 258
        idMenu: menu._id,                                                                                              // 258
        idSitio: sitio._id                                                                                             // 258
      });                                                                                                              // 258
    }                                                                                                                  // 259
                                                                                                                       //
    if (content != undefined && sitio != undefined && menu != undefined) {                                             // 260
      return {                                                                                                         // 261
        find: function () {                                                                                            // 262
          return COMENTARIO.find({                                                                                     // 263
            idContenido: content._id,                                                                                  // 263
            estado: 'visible'                                                                                          // 263
          });                                                                                                          // 263
        },                                                                                                             // 264
        children: [{                                                                                                   // 265
          find: function (coment) {                                                                                    // 266
            // Find post author. Even though we only want to return                                                    // 267
            // one record here, we use "find" instead of "findOne"                                                     // 268
            // since this function should return a cursor.                                                             // 269
            return Meteor.users.find({                                                                                 // 270
              _id: coment.idUsuario                                                                                    // 271
            }, {                                                                                                       // 271
              fields: {                                                                                                // 272
                profile: 1,                                                                                            // 272
                username: 1                                                                                            // 272
              }                                                                                                        // 272
            });                                                                                                        // 272
          }                                                                                                            // 273
        }]                                                                                                             // 265
      };                                                                                                               // 261
    } else {                                                                                                           // 277
      console.log('eroor');                                                                                            // 278
    }                                                                                                                  // 279
  });                                                                                                                  // 281
});                                                                                                                    // 283
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server/main.js                                                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var Meteor = void 0;                                                                                                   // 1
module.watch(require("meteor/meteor"), {                                                                               // 1
  Meteor: function (v) {                                                                                               // 1
    Meteor = v;                                                                                                        // 1
  }                                                                                                                    // 1
}, 0);                                                                                                                 // 1
module.watch(require("./methods.js"));                                                                                 // 1
module.watch(require("./publications.js"));                                                                            // 1
Meteor.startup(function () {                                                                                           // 4
  // code to run on server at startup                                                                                  // 5
  HTTP_FORWARDED_COUNT = 1;                                                                                            // 8
});                                                                                                                    // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./lib/routes.js");
require("./collections/cmscollections.js");
require("./server/methods.js");
require("./server/publications.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
