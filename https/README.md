### http
(参考链接：https://zhuanlan.zhihu.com/p/43789231)
- 传递的数据容易被偷窥和篡改，采用对称加密算法，
- 密钥的传递问题，非对称加密
  - 密钥是一对，公钥和私钥，用公钥加密的数据只能通过私钥解密，用私钥解密的数据只能通过公钥解密
  (
    数学基础是两个超大的素数求乘积非常容易，213213213414324321 * [43214321543254325(把因子当做私钥)]
    但是分解因子十分麻烦
    3214321432154325434321432154325423(``把乘积当做公钥``)
  )
- 非对称加密的速度非常慢，我们采用非对称加密的方式，把A的私钥传递给B，这样双方就都知道了私钥，接下来的数据传输就可以采用对称加密的方式进行传输。

