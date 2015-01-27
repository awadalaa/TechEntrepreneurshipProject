var log                 = require('./libs/log')(module);
var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var PostModel           = require('./libs/mongoose').PostModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;

var faker               = require('Faker');

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "admin", password: "password" });
    user.save(function(err, user) {
        if(err) return log.error(err);
        else log.info("New user - %s:%s",user.username,user.password);
    });

    for(i=0; i<4; i++) {
        var user = new UserModel({ username: faker.name.firstName().toLowerCase(), password: faker.lorem.words(1)[0] });
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });
    }
});


PostModel.remove({}, function(err) {
    var imgArray = ["http://images0.chictopia.com/photos/HenEvia/1871435333/asos-jeans-h-m-shirt-jeepers-peepers-sunglasses-pull-bear-t-shirt.jpg",
            "http://images2.chictopia.com/photos/lanton/4063758851/light-blue-ardene-jeans-black-birkenstock-sandals.jpg",
            "http://images2.chictopia.com/photos/toutlamode/5157866425/black-celine-bag-black-ray-ban-sunglasses-charcoal-gray-dilascia-t-shirt.jpg",
            "http://images2.chictopia.com/photos/stylebyshe/2321180076/faux-leather-forever-21-skirt-long-bebe-earrings.jpg",
            "http://images2.chictopia.com/photos/stayclassic/3544420807/gant-sweater.jpg",
            "http://images0.chictopia.com/photos/fashioncoolture/9700625611/aquamarine-moikana-top.jpg",
            "http://images0.chictopia.com/photos/braNYaudreY/2945759185/navy-front-row-shop-coat-black-h-m-scarf-black-oasap-bag-black-zara-heels.jpg",
            "http://images2.chictopia.com/photos/Dominiquetiu/5907529140/heather-gray-cole-haan-boots-navy-bcbg-max-azria-tights.jpg",
            "http://images0.chictopia.com/photos/HenEvia/2912597898/asos-jeans-vans-sneakers-forever-21-vest-pull-bear-t-shirt.jpg",
            "http://images0.chictopia.com/photos/pupuren/9147557309/brown-heels-jeffrey-campbell-boots-black-black-frames-gap-glasses.jpg",
            "http://images0.chictopia.com/photos/pupuren/6917295488/silver-modcloth-dress.jpg",
            "http://images0.chictopia.com/photos/lanton/1804773781/black-primark-cardigan-black-nike-sneakers.jpg",
            "http://images0.chictopia.com/photos/HenEvia/11144032152/frank-wright-boots-wonderplace-korea-hat-wildfox-sweater-pull-bear-shorts.jpg",
            "http://images2.chictopia.com/photos/tab/9563420968/black-leather-urban-outfitters-vest.jpg",
            "http://images2.chictopia.com/photos/lunalovebad/2774842816/red-rehab-clothing-sweater-black-bad-vibes-shorts-jeffrey-campbell-heels.jpg"
            ];
    for(i=0; i<imgArray.length; i++) {
        var posting = new PostModel({
                "title" : faker.lorem.words(3),
                "author" : faker.internet.userName(),
                "description" : faker.lorem.sentence(),
                "images" : [ 
                    {
                        "kind" : "thumbnail",
                        "url" : imgArray[i]
                    }
                ],
                "modified" : faker.date.past(Math.floor((Math.random() * 10) + 1))
        });
        posting.save(function(err, post) {
            if(err) return log.error(err);
            else log.info("New post - %s:%s",post.author,post.title,post.description);
        });
    }
});



ClientModel.remove({}, function(err) {
    var client = new ClientModel({ name: "mobile_ios_client", clientId: "mobile_ios_client", clientSecret:"secretsaucebaby" });
    client.save(function(err, client) {
        if(err) return log.error(err);
        else log.info("New client - %s:%s",client.clientId,client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});
RefreshTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);
