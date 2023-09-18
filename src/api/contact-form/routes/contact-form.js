 "use strict";

    /**
     * contact-form router
     * src/api/contact-form/routes/contact-form.js
     */

    const { createCoreRouter } = require("@strapi/strapi").factories;

    module.exports = createCoreRouter("api::contact-form.contact-forms ", {
      config: {
        find: {
        /*
        where the array below specifies the path of the request-limiter file,
        src/api/contact-form/middlewares/request-limiter.js , exclulding
        the middleware section of the path
        */
          middlewares: ["api::contact-form.request-limiter"],
        },
      },
    });
