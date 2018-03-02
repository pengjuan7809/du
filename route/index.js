const express = require('express');
var fs = require('fs');
var multer  = require('multer');
const mysql = require('mysql');
const common = require('../libs/common');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myigou'
});
module.exports = () => {
    const route = express.Router();
    const getHomeStr = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product limit 6`;
    const getCateNames = `SELECT * FROM category ORDER BY category_id desc`;
    //首页 为您推荐
    route.get('/home', (req, res) => {
        getHomeDatas(getHomeStr, res);
    });

    function getHomeDatas(getHomeStr, res) {
        db.query(getHomeStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };
    var storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, 'upload')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            let filename = (file.originalname).split('.');  //['文件名','文件后缀'] eg: 1.png
            cb(null, `${Date.now()}.${filename[filename.length-1]}` ); //参数1 null ,参数2 时间戳+后缀
         }
     }); 
    let upload = multer({ storage: storage });
    
    // 单图上传
    route.post('/avatar',upload.any(),(req,res)=>{
        let photo = req.files[0].destination+'/'+ req.files[0].filename;
        let userId=req.body.userId;
        
        const up = `UPDATE user SET user_photo = '${photo}' WHERE user_id =${userId}`;
        db.query(up, (err) => {
            if (err) {
                res.status(500).send('database err').end();
            } else {            
                res.send({ 'msg': ' 上传成功', 'photo': photo }).end(); 
            }
        })
    });

    route.get('/form', function(req, res, next){
        var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
        res.send(form);
    });    
        
    // 首页特色推荐
    route.get('/recom', (req, res) => {
        const getU = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product ORDER BY product.product_name DESC limit 20 `;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    });      
// 分类
    route.get('/category', (req, res) => {
        getCateNamesDatas(getCateNames, res);
    });

    function getCateNamesDatas(getCateNames, res) {
        db.query(getCateNames, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };
    // 所有商品
    route.get('/goods', (req, res) => {
        const getU = `SELECT product_id,product_name,product_price,product_img_url,product_uprice,category_id FROM product ORDER BY product.category_id DESC`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    });      
// 所有分类关联产品    
// route.get('/cateitem', (req, res) => {
//     var i=0;
//     let datas = [];
//     db.query('SELECT * FROM category ORDER BY category_id desc', (err, rows) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('database err').end();
//         } else {
//             rows.forEach(row => {
//                 const productStr = `select * from product where category_id='${row.category_id}'`; 
//                 db.query(productStr, (err, data) => {
//                     if (err) {
//                         console.error(err);
//                         res.status(500).send('database err').end();
//                     } else {
//                         row.produ=data;
//                         console.log(row);
//                     }
//                 }); 
//                 datas[i]=row;
//                 i++;               
//             });
//             res.send(datas);
            




//         }
//     });

// });    
// 分类下的产品    
    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        let start= (req.query.page-1)*10;
        const sql = `select * from product,category where product.category_id=category.category_id and category.category_id='${mId}' limit ${start},10 `;
    //  const sql = `select * from product   limit 2*1,10 `;
        getCateGoods(sql, res);
    });

    function getCateGoods(sql, res) {
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.send(data);
                    // res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    };
// 产品详情     
    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id='${produId}'`;
        const productStr = `select * from product where product_id='${produId}'`;
        let detailDatas = [];
        db.query(imagesStr, (err, imgDatas) => {
            if (err) {
                console.error(err);
                res.status(500).send('database err').end();
            } else {
                detailDatas.push(imgDatas);
                db.query(productStr, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database err').end();
                    } else {
                        detailDatas.push(data);
                        res.send(detailDatas);
                    }
                });
            }
        });

    });
    /*
     *加入购物车
     */
    route.post('/addcart', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let userId = mObj.userId;
        let productId = mObj.productId;
        let goodsNum = mObj.goodsNum;
        let created=new Date().getFullYear();

        const insGoodsCart = `INSERT INTO goods_cart(user_id,product_id,goods_num,created) VALUES(${userId},${productId},${goodsNum},'${created}')`;
        db.query(insGoodsCart, (err) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '加入成功', 'status': 1 }).end();
            }
        })
    });    
    // 购物车
    route.get('/cart', (req, res) => {
        const cartStr = "SELECT cart_id,user.user_id,product.product_id,product_name,product_uprice,product_img_url,goods_num,product_num,shop_name FROM product,user,goods_cart,shop where product.product_id=goods_cart.product_id and user.user_id=goods_cart.user_id and shop.shop_id = product.shop_id";
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    });
    // 地址
    route.get('/address', (req, res) => {
        let userId = req.query.userId;
        const cartStr = `SELECT * FROM address WHERE user_id = ${userId} ORDER BY isdefault DESC`;
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }); 
    /*
     *添加地址
     */
    route.post('/addaddress', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let userId = mObj.userId;
        let addressInfo = mObj.addressInfo;
        let isdefault = mObj.isdefault;
        let userPhone = mObj.userPhone;
        let addressArea = mObj.addressArea;
        let sname = mObj.sname;

        const insAddress = `INSERT INTO address(user_id, addressinfo, isdefault, user_phone, addressarea, sname) VALUES(${userId},'${addressInfo}','${isdefault}','${userPhone}','${addressArea}','${sname}')`;
        db.query(insAddress, (err) => {
            if (err) {
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '加入成功', 'status': 1 }).end();
            }
        })
    }); 
    /*
     *修改默认地址
     */
    route.post('/updateaddress', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let userId = mObj.userId;
        let addressId = mObj.addressId;

        
        const upAddress1 = `UPDATE address SET isdefault = '0' WHERE user_id = ${userId}`;
        const upAddress2 = `UPDATE address SET isdefault = '1' WHERE address_id = ${addressId}`;
        db.query(upAddress1, (err) => {
            if (err) {
                res.status(500).send('database err').end();
            } else {
                db.query(upAddress2, (err) => {
                    if (err) {
                        res.status(500).send('database err').end();
                    } else {
                        res.send({ 'msg': '修改成功', 'status': 1 }).end();
                    }
                })                
                 
            }
        })
    });
    // 订单
    route.get('/order', (req, res) => {
        let userId = req.query.userId;
        const cartStr = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY order_id DESC`;
        db.query(cartStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    });                
// 搜索
    route.get('/search', (req, res) => {
        let keyWord = req.query.kw;
        let hot = req.query.hot;
        let priceUp = req.query.priceUp;
        let priceDown = req.query.priceDown;
        const keywordStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%'`;
        const hotStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_comment_num desc`;
        const priceUpStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice asc`;
        const priceDownStr = `select  *  from product,shop where product.shop_id=shop.shop_id and product.product_name like '%${keyWord}%' order by product_uprice desc`;
        if (keyWord != '') {
            if (hot != '') {
                getSearchDatas(hotStr, res);
            } else if (priceUp != '') {
                getSearchDatas(priceUpStr, res);
            } else if (priceDown != '') {
                getSearchDatas(priceDownStr, res);
            } else {
                getSearchDatas(keywordStr, res);
            }
        }

    });
    /**
        get search datas
    */
    function getSearchDatas(keywordStr, res) {
        db.query(keywordStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }
    /*
     *user reg func
     */
    route.post('/reg', (req, res) => {

        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let regName = mObj.regName;
        let regPasswd = mObj.regPasswd;
        regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);
        const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`;
        delReg(insUserInfo, res);
    });
    /*
     *deal user register
     */
    function delReg(insUserInfo, res) {
        db.query(insUserInfo, (err) => {
            if (err) {
                console.error(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                res.send({ 'msg': '注册成功', 'status': 1 }).end();
            }
        })
    };
    route.post('/login', (req, res) => {
        let mObj = {};
        for (let obj in req.body) {
            mObj = JSON.parse(obj);
        }
        let username = mObj.loginName;
        let password = common.md5(mObj.loginPawd + common.MD5_SUFFXIE);;
        // console.log(username, mObj.passwd);
        const selectUser = `SELECT * FROM user where user_name='${username}'`;
        db.query(selectUser, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'msg': '服务器出错', 'status': 0 }).end();
            } else {
                if (data.length == 0) {
                    res.send({ 'msg': '该用户不存在', 'status': -1 }).end();
                } else {
                    let dataw = data[0];
                    //login sucess
                    if (dataw.login_password === password) {
                        //save the session 
                        req.session['user_id'] = dataw.user_id;
                        dataw.msg = "登录成功";
                        dataw.status = 1;
                        res.send(dataw).end();
                    } else {
                        res.send({ 'msg': '密码不正确', 'status': -2 }).end();
                    }
                }
            }
        });

    });
    // 获取用户信息
    route.get('/userinfo', (req, res) => {
        let uId = req.query.uId;
        console.log(req.query);
        const getU = `SELECT * FROM user where user_id='${uId}'`;
        db.query(getU, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data[0]);
                }
            }
        });
    });   
    return route;
}
