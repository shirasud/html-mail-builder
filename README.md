# HTML メールビルダー

HTML メールをライブリロードしながらコーディングができる。
SCSS で定義したクラスをテンプレートで使用することで
最終的にインライン CSS 化した状態で HTML としてビルドされる。

## 設定

```
node -v
v10.18.0

npm -v
6.13.4

yarn -v
1.13.0
```

```
yarn install
yarn watch
yarn browser
```

http://localhost:8000/sample/

![スクリーンショット 2020-08-02 1 31 18](https://user-images.githubusercontent.com/18590982/89105866-ecea9680-d45f-11ea-8503-c93bd2d20204.png)

## ディレクトリ

```
.
├── src ... 開発の際に変更を加える
│   ├── images ... ローカルの画像置き場
│   │   └── logo.png
│   ├── img_src_replace.json ... ローカルの画像パスをCDN等の絶対パスで書き換えるためのファイル
│   ├── stylesheets ... SCSS置き場
│   │   ├── _base.scss
│   │   └── sample
│   │       └── styles.scss
│   └── templates ... テンプレート置き場
│       └── sample
│           └── index.ejs
├── tmp ... ビルドで使用される一時ファイル
│   ├── css
│   │   └── sample
│   │       └── styles.css
│   └── dev
│       └── sample
│           └── index.html
├── public ... yarn browserで立ち上げたローカルサーバから参照される
│   ├── images
│   │   └── logo.png
│   └── sample
│       └── index.html
├── prod ... ビルドで生成される本番用ファイル
│   └── sample
│       └── index.html
├── README.md ... 本ドキュメント
├── guideline.md ... HTMLメールのコーディングガイドライン
├── gulpfile.js
├── package.json
└── yarn.lock
```

## 新しいテンプレートの追加方法

### 作成するテーマを theme01 とする

### ディレクトリきって以下のファイルを設置

```
./html-mail-builder/src/stylesheets/theme01/styles.sass
./html-mail-builder/src/templates/theme01/index.ejs
```

### 確認する

```
# ターミナル1
yarn watch

# ターミナル2
yarn browser
```

http://localhost:8000/theme01/

./src 配下のファイルに変更を加える度にライブリロードされる

### 画像を設置

`./src/images`に画像を置く

### 画像を絶対パスに置換する設定

- 画像を CDN に上げる
- `./img_src_replace.json` に置換したいパスを追加

### メールのテスト配信

以下のファイルの内容を Litmus などを使ってテスト送信する

`./prod/theme10/index.html`

## ルール

[HTML コーディングルール]('./guideline.md')

## 参考

- [HTML メールコーディングガイドライン](https://github.com/hteumeuleu/email-guidelines)
- [2017 年の HTML メールを取り巻く環境とモダン開発](https://www.tam-tam.co.jp/tipsnote/html_css/post12074.html)
- [HTML メール作成で調べたことまとめ](https://qiita.com/ta-ke-no-bu/items/675130afd1ecc09e38b4)
- [どれ使えばいいの？スマホで見やすい HTML メールの作り方、4 種類（スケーラブル、フルード、レスポンシブ、ハイブリッド）](https://www.techscore.com/blog/2016/09/16/%E3%81%A9%E3%82%8C%E4%BD%BF%E3%81%88%E3%81%B0%E3%81%84%E3%81%84%E3%81%AE%EF%BC%9F%E3%82%B9%E3%83%9E%E3%83%9B%E3%81%A7%E8%A6%8B%E3%82%84%E3%81%99%E3%81%84html%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE/)
- [各メーラーの CSS 対応状況](https://www.campaignmonitor.com/css/)
- [環境に依存しない HTML メールを作成するためのベストプラクティス](https://sendgrid.kke.co.jp/blog/?p=2223)
