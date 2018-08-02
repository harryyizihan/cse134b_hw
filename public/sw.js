console.log('Hello from sw.js');

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
      // Use a custom cache name
      cacheName: 'css-cache',
    })
  );
  
  workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    // Use the cache if it's available
    workbox.strategies.cacheFirst({
      // Use a custom cache name
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images
          maxEntries: 20,
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.precaching.precacheAndRoute([
  {
    "url": "404.html",
    "revision": "0a27a4163254fc8fce870c8cc3a3f94f"
  },
  {
    "url": "about.html",
    "revision": "8026ae568fe2e16f6ba8db0c1b4d9f1d"
  },
  {
    "url": "add_into_database.js",
    "revision": "af73224255fada3f9b619a05a864542f"
  },
  {
    "url": "Avatar.png",
    "revision": "e69d732d1f1ecf354953504dbde5c114"
  },
  {
    "url": "background_img.jpg",
    "revision": "b217dc9e33ac5db56365a35cabab99f3"
  },
  {
    "url": "contact.html",
    "revision": "8026ae568fe2e16f6ba8db0c1b4d9f1d"
  },
  {
    "url": "credits.html",
    "revision": "8026ae568fe2e16f6ba8db0c1b4d9f1d"
  },
  {
    "url": "database_access_close.js",
    "revision": "c0d611f7205a826338f0bfae786891b4"
  },
  {
    "url": "database_access_delete.js",
    "revision": "79fe78fa478323c307100ca929421681"
  },
  {
    "url": "db.json",
    "revision": "1fed1582694003a6ec0f56749b0903db"
  },
  {
    "url": "edit_issue_database.js",
    "revision": "5b3cb703563ce871d19e5c11cd2ceeee"
  },
  {
    "url": "favicon.png",
    "revision": "d8a5608193e02857f5fd70241f5173ec"
  },
  {
    "url": "formatted_icon.png",
    "revision": "9a09054303e1fb83b4cedfc93792ed47"
  },
  {
    "url": "gif_img.html",
    "revision": "09a8168bcbadd2820658903256e19684"
  },
  {
    "url": "help.html",
    "revision": "8026ae568fe2e16f6ba8db0c1b4d9f1d"
  },
  {
    "url": "index.html",
    "revision": "a29ab4b0b6c679234c4649dbb8747f71"
  },
  {
    "url": "issuelist.html",
    "revision": "4f7b42b6dc6ce5c0fb9a6ed7133a789a"
  },
  {
    "url": "jpeg_img.html",
    "revision": "31b0d629decb4b89eaab25d67c9688b7"
  },
  {
    "url": "login_auth.js",
    "revision": "097fc522b3ff6cb4dd3f58fcbe016ea1"
  },
  {
    "url": "login_form.html",
    "revision": "244176f22f29711b288c45444d4c1b1b"
  },
  {
    "url": "ManageIssuesStyle.css",
    "revision": "97584928d30ec137caf54096512876e9"
  },
  {
    "url": "mode_check.js",
    "revision": "8092a0b0833e8a3622fcb59881fb1b71"
  },
  {
    "url": "night_issue_detail.css",
    "revision": "67408ec610206f2802ac642f75b5cf34"
  },
  {
    "url": "night_issuelist.css",
    "revision": "dbe4db27f42219c8d4f5ef159ad0b10f"
  },
  {
    "url": "normal_issue_detail.css",
    "revision": "e59b05fbd345f03ef948ec607771ef8a"
  },
  {
    "url": "normal_issuelist.css",
    "revision": "089edbd3cf17e78221bc55d4e9c71292"
  },
  {
    "url": "normal_picture_issue.css",
    "revision": "8062bc8675dc7da3cb5679cdbbe10fc1"
  },
  {
    "url": "normal_sample_issue.css",
    "revision": "2aa2020977a3cb0f4078f110bfd0b915"
  },
  {
    "url": "pic_gif.gif",
    "revision": "31324d95caee6c1bc62b15d7356a6aa0"
  },
  {
    "url": "pic_svg.svg",
    "revision": "0e20f78454a80c5a51bff6c0eadac1e7"
  },
  {
    "url": "pic_webp.webp",
    "revision": "12691d62de3569232257a2931b027f70"
  },
  {
    "url": "pic-jpeg.jpg",
    "revision": "5b3638336e58fe4d0d0252a0c15cfa45"
  },
  {
    "url": "pic-png.png",
    "revision": "035d6cf775cb12578a482ad4a2319938"
  },
  {
    "url": "png_img.html",
    "revision": "46727deb976e08cba057f402f79b91bf"
  },
  {
    "url": "printer_issue_detail.css",
    "revision": "e8be0261bd50f6d57426d5ab098adc15"
  },
  {
    "url": "printer_issuelist.css",
    "revision": "55770d049a00921e5b59f66d68784730"
  },
  {
    "url": "printer_picture_issue.css",
    "revision": "27a6af0bb271ddc57e2401763c1ed40d"
  },
  {
    "url": "printer_sample_issue.css",
    "revision": "f8d62f2af9730d7a0a7755e53fef52ba"
  },
  {
    "url": "read_database.js",
    "revision": "24776c6563b617985cca87ac4abfe468"
  },
  {
    "url": "read_detail.js",
    "revision": "c888407b6ed44ea6ca4329f4a841ca1f"
  },
  {
    "url": "sample_detail_page.html",
    "revision": "9a2082b569b9406c0374a59f7e0eed26"
  },
  {
    "url": "sampleIssuePic.PNG",
    "revision": "05ae1154c7080ae4e72e4b08443f556b"
  },
  {
    "url": "sign_out_CRUD_use.js",
    "revision": "7adee8cfade809f0c25e2c90092ab1e0"
  },
  {
    "url": "sign_out.js",
    "revision": "3dd8e994c00eb4756abf475ca849fd9a"
  },
  {
    "url": "signup_auth.js",
    "revision": "fd9d7112a9d2ab3b81e44f6c58c382f1"
  },
  {
    "url": "signup_form.html",
    "revision": "b7a1cc4338d151a800e6e17f1b7a8fbc"
  },
  {
    "url": "svg_img.html",
    "revision": "c4f1e9070dd6bf7d566bad1165234d5e"
  },
  {
    "url": "sw.js",
    "revision": "4a0006c94f15ad7937c32417b15b4a6e"
  },
  {
    "url": "terms.html",
    "revision": "8026ae568fe2e16f6ba8db0c1b4d9f1d"
  },
  {
    "url": "Under_construction.JPG",
    "revision": "057dd15a1b209b1621efa79650f73f9c"
  },
  {
    "url": "unfinished.html",
    "revision": "22c287d9bf84b822dc3a5358da3dfb76"
  },
  {
    "url": "webp_img.html",
    "revision": "05a1de78c3af14a99cf360f6a377dc69"
  },
  {
    "url": "workbox-config.js",
    "revision": "c315d0ca4159dceb205a66e28c8892db"
  }
]);