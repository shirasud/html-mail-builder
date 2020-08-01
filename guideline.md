# HTML メールコーディングガイドライン

## ルール（整理中）

- 基本的にテーブルコーディング
  - レイアウトを作るのに`float`や`position:absolute`、`flex`などで組んではいけない
- table タグに初期化スタイルが当たっていること
  - `<table width="100%" border="0" cellpadding="0" cellspacing="0">`
- table, tr, td に margin:0, padding:0 が当たっていること
- margin, padding を使わない
  - https://sendgrid.kke.co.jp/blog/?p=2223
- 2 カラムの場合などは`<td>`タグ内に`<table>`を書く
- 基本はインライン CSS で`<style>`タグに入れるのはメディアクエリのみに留める
  - `<style>`タグを無視するメーラーがあるため
- 全体のサイズは 600px で作る
- レスポンシブで表示が問題ないように作る
  - 2016.09 に Gmail もメディアクエリ対応している
  - https://www.litmus.com/blog/gmail-to-support-responsive-email-design/
- 画像は png ではなく軽量な gif や jpg を使用する
  - 小さいものや重要なものは png でも可能。スパム判定されないように容量には気をつける
  - 重要なボタンなどは retina サイズで用意してもいい
- 画像全てに alt を入れる
  - ユーザが許可するまで画像が表示されないケースが結構な確率でありうる
- CSS は使用する前に主要メーラーでサポートされているか確認する
  - https://www.campaignmonitor.com/css/media-queries/max-width/
- Web メール向けにクロスブラウザ対応されていること
  - CSS3 などは基本的に使うことはないと思うが使うとしたら以下のような考慮が必要
  - ```
    hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    ```
- 特定の CSS が効かないメーラー向けの対応も考える
  - 例: グラデーションが使いたいが背景画像も効かないメーラー向けの背景色定義
    - `background-image`が効かないメーラーが多々ある
    - `background: linear-gradient(180deg, #57C0C0 0%, #16328C 100%);`のグラデーションが効かないメーラーもある
    - `background-color`も定義しておくといったような
- `<a>`タグに `target="_blank"`が入っていること
- 余白は height 属性と style で高さが指定されていること(height 属性のみでは Android で無視される)
  - ```
    <tr width="100%" height="20" style="height: 20px; padding: 0; text-align: left; vertical-align: top;">
        <td style="-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; hyphens: auto; margin: 0; padding: 0; text-align: left; vertical-align: top; word-break: break-all; word-wrap: break-word;"></td>
    </tr>
    ```
- コンテンツが長すぎないように（重要なものは上に配置するように）
  - Yahoo の Web メールでは、長いものは最初は一部しか表示されない
- `<body>`のスタイルにデバイスフォントでの表示指定が入っているか
  - ```
    font-family: "Helvetica Neue", Helvetica, Arial, "Noto Sans JP", "游ゴシック",
    YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN",
    "Hiragino Sans", "メイリオ", Meiryo, sans‒serif;
    ```
  - Web フォントの使用は避ける

## メーラー別の表示確認

[litmus](https://www.litmus.com/)で各メーラーの表示をシミュレートできるが有料

下記で定義されているメーラーで可能な限り確認
https://www.campaignmonitor.com/css/media-queries/max-width/

また、iOS ではダークモードでの表示も確認できると良い

| Desktop           | AOL Desktop              |
| :---------------- | :----------------------- |
| Desktop / Mac     | Apple Mail 10            |
| Desktop           | IBM Notes 9              |
| Desktop / Windows | Outlook 2000–03          |
| Desktop / Windows | Outlook 2007–16          |
| Desktop / Windows | Outlook Express          |
| Desktop / Mac     | Outlook for Mac          |
| Desktop           | Postbox                  |
| Desktop           | Thunderbird              |
| Desktop / Windows | Windows 10 Mail          |
| Desktop / Windows | Windows Live Mail        |
| Mobile / Android  | Android 4.2.2 Mail       |
| Mobile / Android  | Android 4.4.4 Mail       |
| Mobile / Android  | AOL Alto Android app     |
| Mobile / iOS      | AOL Alto iOS app         |
| Mobile            | BlackBerry               |
| Mobile / Android  | Gmail Android app        |
| Mobile / Android  | Gmail Android app IMAP   |
| Mobile / iOS      | Gmail iOS app            |
| Mobile            | Gmail mobile webmail     |
| Mobile / Android  | Google Inbox Android app |
| Mobile / iOS      | Google Inbox iOS app     |
| Mobile / iOS      | iOS 10 Mail              |
| Mobile / iOS      | iOS 11 Mail              |
| Mobile / Android  | Outlook Android app      |
| Mobile / iOS      | Outlook iOS app          |
| Mobile            | Sparrow                  |
| Mobile            | Windows Phone 8 Mail     |
| Mobile / Android  | Yahoo! Mail Android app  |
| Mobile / iOS      | Yahoo! Mail iOS app      |
| Webmail / Mac     | AOL Mail                 |
| Webmail / Mac     | G Suite                  |
| Webmail / Mac     | Gmail                    |
| Webmail / Mac     | Google Inbox             |
| Webmail / Mac     | Outlook.com              |
| Webmail / Mac     | Yahoo! Mail              |
| Webmail / Windows | AOL Mail                 |
| Webmail / Windows | G Suite                  |
| Webmail / Windows | Gmail                    |
| Webmail / Windows | Google Inbox             |
| Webmail / Windows | Outlook.com              |
| Webmail / Windows | Yahoo! Mail              |

## リリース前確認

- [ ] テーブル以外でレイアウトが作られていない(float や position など)
- [ ] 画像が表示されない状況でも表示に問題がない（画像全てに alt が入っている）
- [ ] margin, padding で余白調整されていない
- [ ] `<style>`タグは`<head>`タグ内かつメディアクエリのみの記述になっている
- [ ] 画像は基本的に jpg 推奨、メイン画像など無駄に大きいところで png を使っていない
- [ ] 上下の余白は tr で、style も記述されている`<tr width="100%" height="20" style="height: 20px;"><td></td></tr>`
- [ ] PC, モバイルともに表示崩れがない
- [ ] 主要メーラー、クロスブラウザで表示確認できていること
- [ ] `<a>`タグに`target="_blank"`が入っていること
- [ ] 使用している CSS が各メーラーに対応しているか把握できていること
