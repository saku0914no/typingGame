
// 現在時刻を表示
function TimeText() {
    var realTime = new Date();
    var years = realTime.getFullYear();
    // getMonthは0から始まるので1を足す
    var months = realTime.getMonth() + 1;
    var days = realTime.getDate();
    var weeks = weekdays();
    var hours = realTime.getHours();
    hours = (hours < 10) ? "0" + String(hours) : hours;
    var minutes = realTime.getMinutes();
    minutes = (minutes < 10) ? "0" + String(minutes) : minutes;
    var timeText = years + "年" + months + "月" + days + "日" + weeks + hours + ":" + minutes;
    document.getElementById("real-time").innerHTML = timeText;
    setInterval('TimeText()', 15000);
}
function weekdays() {
    var weeks = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    var realTime = new Date();
    var weekdays = realTime.getDay();
    return weeks[weekdays];
}


// 問題文
let Q = ["apple", "banana", "melon", "orange", "juice", "lemon", "fruit", "nuts", "peach", "cherry"];
let QL = Q.length

function LS() {
    localStorage.clear();
    Q = ["apple", "banana", "melon", "orange", "juice", "lemon", "fruit", "nuts", "peach", "cherry"];
    QL = Q.length
    localStorage.setItem("Q_Length", QL);
    for (let i = 0; i < QL; i++) {
        localStorage.setItem("Q" + i, Q[i]);
    }
    koushin();
}

// 問題をランダムで出題
// Math.floor : 小数点切り捨て
// Math.random : 乱数を作成　Q.length : Qの長さ分かける（Qの長さ分乱数がつくられる）
let Q_No = Math.floor(Math.random() * Q.length);
// 回答初期値・現在単語がどこまであっているか判定をしている文字番号
let Q_i = 0;
// 計算用の文字の長さ　pickされた問題文の長さを測る
let Q_l = Q[Q_No].length;

// 間違えた数カウント
let misstype = 0;
// 問題番号（1から始まる
let currentQuestion = 1;
// 全部で10問
let totalQuestions = 10;
let GameEnd = false;

function startGame() {
    resetGame();
}

if (!GameEnd) {
        window.addEventListener("keydown", game);
    }

function game(event) {
    if (GameEnd) {
        // GameEndがtrueの時、スペースが押されたらリセットする関数を呼び出す
        if (event.key == " ") {
            resetGame();
        }
    }
    // 押されたキーを取得
    let keyCode = event.key;
    // もし問題文の文字の長さが問題文から正解した数を引いた数と等しいなら（一つも正解していない、最初の状態なら）
    // if (Q_l == Q_l - Q_i) {
    if (Q_i == 0) {
        // 問題を書き出す
        // substring : 文字列の取り出し（開始位置、終了位置）
        document.getElementById("start").innerHTML = "第" + currentQuestion + "問<br>" + Q[Q_No].substring(Q_i, Q_l);
    }
    // 押したキーが合っていたら
    // charAt : 文字列の指定した位置にある文字を取得
    if (Q[Q_No].charAt(Q_i) == keyCode) {
        // 判定する文章に1を足す（これで何文字目まで進んでいるか判定できる
        Q_i++;
        // 正解したキーを取り除いて、問題文を書き出す
        document.getElementById("start").innerHTML = "第" + currentQuestion + "問<br>" + Q[Q_No].substring(Q_i, Q_l);
        // 全部正解したら
        if (Q_l - Q_i == 0) {
            // 次の問題へ進む
            currentQuestion++;
            if (currentQuestion > totalQuestions) {
                document.getElementById("start").innerHTML = "END<br>間違えた数 : " + misstype + "回<br>spaceキーで再挑戦";
                GameEnd = true;
                if (misstype <=5) {
                    document.getElementById("hantei").innerHTML = `<img src="images/eto_hitsuji_sensu.png" alt="結果判定画像">` + "<br>素晴らしい～";
                } else if (misstype <= 12) {
                    document.getElementById("hantei").innerHTML = `<img src="images/eto_hitsuji_dance.png" alt="結果判定画像">` + "<br>なかなかやるねー";
                } else {
                    document.getElementById("hantei").innerHTML = `<img src="images/eto_hitsuji_sleep.png" alt="結果判定画像">` + "<br>頑張ろう～";
                }
                // document.getElementById("stateButton").innerHTML = `<input type="button" value="ゲームスタート" onclick="startGame()">`;
            } else {
                // 問題をランダムで出題
                Q_No = Math.floor(Math.random() * Q.length);
                // 回答初期値リセット
                Q_i = 0;
                // 計算用の文字の長さ
                Q_l = Q[Q_No].length;
                // 新たな問題を書きだす
                document.getElementById("start").innerHTML = "第" + currentQuestion + "問<br>" + Q[Q_No].substring(Q_i, Q_l);
            }
        }
    } else if (Q[Q_No].charAt(Q_i) !== keyCode) {
        // !== : イコールではないことを表す
        misstype++;
    }
}
function resetGame() {
    // misstype数、今何問目かの値を戻し、falseに戻す
    misstype = 0;
    currentQuestion = 1;
    GameEnd = false;
    Q_No = Math.floor(Math.random() * Q.length);
    // 回答初期値リセット
    Q_i = 0;
    // 計算用の文字の長さ
    Q_l = Q[Q_No].length;
    document.getElementById("startButton").innerHTML = "";
    document.getElementById("hantei").innerHTML = "";
    // 新たな問題を書きだす
    document.getElementById("start").innerHTML = "第" + currentQuestion + "問<br>" + Q[Q_No].substring(Q_i, Q_l);

}
// 参考：　https://janken.asotetu.work/js_tip/

// 問題数変更
function NQ() {
    let Number_of_Question = document.getElementById("NoQ").value;
    document.getElementById("step").textContent = Number_of_Question;
    totalQuestions = Number_of_Question;
}

// 問題の追加
function input_Q() {
    let new_Q = document.getElementById("input_list").value;
    Q.push(new_Q);
    document.getElementById("input_list").value = "";
    
    localStorage.clear();

    // ここ
    QL = Q.length
    localStorage.setItem("Q_Length", QL);
    for (let i = 0; i < QL; i++) {
        localStorage.setItem("Q" + i, Q[i]);
    }

    koushin();
}

// 問題の削除選択
function delete_select() {
    let str = "";
    str += "<option value='-1'>削除したい問題を選択 ▼</option>"
    for (let i = 0; i < QL; i++) {
        str += `<option value="${i}">`;
        str += Q[i];
        str += "</option>";
    }
    document.getElementById("delete_list").innerHTML = str;
}
// 削除ボタン
function delete_Q() {
    let delete_item = document.getElementById("delete_list").value;
    console.log(delete_item);
    if (delete_item === -1 || isNaN(delete_item)) {
        window.alert("問題を選択してください");
        return;
    }
    let DQ = Q[delete_item]
    window.alert(`${DQ}を削除しました`);
    // 〇番目の項目から、△コ削除 : delete_itemで選ばれた項目から１つ削除
    Q.splice(delete_item, 1);
    localStorage.clear();

    // ここ
    QL = Q.length
    localStorage.setItem("Q_Length", QL);
    for (let i = 0; i < QL; i++) {
        localStorage.setItem("Q" + i, Q[i]);
    }

    koushin();
}

// 更新されたときに動く関数
function koushin() {
    // 時間表示
    TimeText();

    // koushin() 保存済みのデータを取得
    QL = localStorage.getItem("Q_Length");
    for (let i = 0; i < QL; i++) {
        Q[i] = localStorage.getItem("Q" + i);
    }

    // 現在の総問題数を表示する
    document.getElementById("step").textContent = totalQuestions;
    // Q_Listの中にQの中身を書き込む、join("<br>")で各要素の間にbrを入れる
    // apple<br>banana<br>melon　になる
    document.getElementById("Q_List").innerHTML = Q.join("<br>");
    // 削除する問題選択の項目を更新
    delete_select();
}

