<div align="center">

  # Tamagotchi Battle

  <a href="https://gitpod.io/#https://github.com/btwiuse/tamagotchi-battle" target="_blank">
    <img src="https://gitpod.io/button/open-in-gitpod.svg" width="240" alt="Gitpod">
  </a>

  [拓麻歌子- 维基百科，自由的百科全书](https://zh.wikipedia.org/zh-hans/塔麻可吉)

  ![cover](https://i.imgur.com/mgY2VVW.jpg)

</div>

## 内容主题与时间分配

| File Path | Description | Time Allocation |
| :---: | :---: | :---: |
| [./app](./app) | 模板合约 | 约 40 分钟 |
| [./tamagotchi](./tamagotchi) | 宠物合约 | 约 40 分钟 |
| [./battle](./battle) | 对战游戏合约 | 约 40 分钟 |
| [./frontend](./frontend) | 游戏前端&合约交互 | [![Play Button](https://img.icons8.com/material-rounded/24/000000/play--v1.png)](https://tamagotchi-battle.vercel.app) |

## 准备工作

### 安装 Polkadot.js extension

选择适合你浏览器的版本: [Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd) / [Firefox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/)

### 生成随机钱包地址

右上角 + => Create new account => 保存助记词 => 设置账户名称 / 密码

### 获取测试代币

打开 [Gear IDEA](https://idea.gear-tech.io/), 授权访问钱包插件

切换到 Gear Staging Testnet V7 测试网

点击右上角齿轮图标, 完成 Captcha 验证后可获取 1K 测试代币

### 环境搭建

进入 [./app](./app) 目录, 在 GitPod 执行

```
make init
```

### 编译部署模板合约

编译

```
make build
```

完成后下载

- ./target/wasm32-unknown-unknown/release/app.opt.wasm
- ./app.meta.txt

在 [Gear IDEA](https://idea.gear-tech.io/) 部署合约

## Tamagotchi 合约

[./tamagotchi](./tamagotchi)

## Battle 合约

[./battle](./battle)
