import { memberList } from "$lib/store/app-stores";
import { localMemberList } from "./dataAPI/api-localstore";

// a08
export let memberDB = [
{ "name": "a08-01",  "chineseChar" : "胡圆圆" },
{ "name": "a08-02",  "chineseChar" : "杨誉" },
{ "name": "a08-03",  "chineseChar" : "方丽超" },
{ "name": "a08-04",  "chineseChar" : "张雨凡" },
{ "name": "a08-05",  "chineseChar" : "胡颖" },
{ "name": "a08-06",  "chineseChar" : "徐佳颖" },
{ "name": "a08-07",  "chineseChar" : "陶健" },
{ "name": "a08-08",  "chineseChar" : "李心怡" },
{ "name": "a08-09",  "chineseChar" : "陶振宇" },
{ "name": "a08-10",  "chineseChar" : "杨锦昊" },
{ "name": "a08-11",  "chineseChar" : "罗妍" },
{ "name": "a08-12",  "chineseChar" : "邹若琳" },
{ "name": "a08-13",  "chineseChar" : "支鸿康" },
{ "name": "a08-14",  "chineseChar" : "曾正鹏" },
{ "name": "a08-15",  "chineseChar" : "汪诗雨" },
{ "name": "a08-16",  "chineseChar" : "刘佳玉" },
{ "name": "a08-17",  "chineseChar" : "高子涵" },
{ "name": "a08-18",  "chineseChar" : "胡佳慧" },
{ "name": "a08-19",  "chineseChar" : "胡德智" },
{ "name": "a08-20",  "chineseChar" : "吴优" },
{ "name": "a08-21",  "chineseChar" : "吴永诚" },
{ "name": "a08-22",  "chineseChar" : "刘文涛" },
{ "name": "a08-23",  "chineseChar" : "李俊" },
{ "name": "a08-24",  "chineseChar" : "王瑞敏" },
{ "name": "a08-25",  "chineseChar" : "李嘉琪" },
{ "name": "a08-26",  "chineseChar" : "毛雨胧" },
{ "name": "a08-27",  "chineseChar" : "黄梦欣" },
{ "name": "a08-28",  "chineseChar" : "李健彬" },
{ "name": "a08-29",  "chineseChar" : "侯慧欣" },
{ "name": "a08-30",  "chineseChar" : "熊思豪" },
{ "name": "a08-31",  "chineseChar" : "冯鑫怡" },
{ "name": "a08-32",  "chineseChar" : "罗文豪" },
{ "name": "a08-33",  "chineseChar" : "胡欢" },
{ "name": "a08-34",  "chineseChar" : "万珂颀" },
{ "name": "a08-35",  "chineseChar" : "熊峻艺" },
{ "name": "a08-36",  "chineseChar" : "钱佳" },
{ "name": "a08-37",  "chineseChar" : "熊晋鑫" },
{ "name": "a08-38",  "chineseChar" : "支圣康" },
{ "name": "a08-39",  "chineseChar" : "程轲" },
{ "name": "a08-40",  "chineseChar" : "陶麒弘" },
{ "name": "a08-41",  "chineseChar" : "胡庆涛" },
{ "name": "a08-42",  "chineseChar" : "胡若一" },
{ "name": "a08-43",  "chineseChar" : "付志谊" },
{ "name": "a08-44",  "chineseChar" : "邹佳乐" },
{ "name": "a08-45",  "chineseChar" : "张煜晨" },
{ "name": "a08-46",  "chineseChar" : "吴卓雅" },
{ "name": "a08-47",  "chineseChar" : "章伟鸣" },
{ "name": "a08-48",  "chineseChar" : "江义" },
{ "name": "a08-49",  "chineseChar" : "吴思贤" },
{ "name": "a08-50",  "chineseChar" : "诸昱昊"  }
]

// a02
// export let memberDB = [
//     { "name" : "n-01", "chineseChar": "徐晨霞" },
//     { "name" : "n-02", "chineseChar": "张延逸" },
//     { "name" : "n-03", "chineseChar": "罗佳慧" },
//     { "name" : "n-04", "chineseChar": "陶素卿" },
//     { "name" : "n-05", "chineseChar": "龚汉娟" },
//     { "name" : "n-06", "chineseChar": "章伟娜" },
//     { "name" : "n-07", "chineseChar": "潘乐云" },
//     { "name" : "n-08", "chineseChar": "李子萱" },
//     { "name" : "n-09", "chineseChar": "侯嘉颖" },
//     { "name" : "n-10", "chineseChar": "邹雅菲" },
//     { "name" : "n-11", "chineseChar": "杨上珍" },
//     { "name" : "n-12", "chineseChar": "万丽娜" },
//     { "name" : "n-13", "chineseChar": "刘文慧" },
//     { "name" : "n-14", "chineseChar": "万欣瑶" },
//     { "name" : "n-15", "chineseChar": "车雨欣" },
//     { "name" : "n-16", "chineseChar": "何颖" },
//     { "name" : "n-17", "chineseChar": "张艳" },
//     { "name" : "n-18", "chineseChar": "万冰雨" },
//     { "name" : "n-19", "chineseChar": "付思思" },
//     { "name" : "n-20", "chineseChar": "瞿苏彤" },
//     { "name" : "n-21", "chineseChar": "吴兰雨" },
//     { "name" : "n-22", "chineseChar": "熊玉婷" },
//     { "name" : "n-23", "chineseChar": "李紫瑶" },
//     { "name" : "n-24", "chineseChar": "涂怡欣" },
//     { "name" : "n-25", "chineseChar": "杨玉凤" },
//     { "name" : "n-26", "chineseChar": "盛可心" },
//     { "name" : "n-27", "chineseChar": "侯成城" },
//     { "name" : "n-28", "chineseChar": "吴珺琪" },
//     { "name" : "n-29", "chineseChar": "付子昭" },
//     { "name" : "n-30", "chineseChar": "吴梦婷" },
//     { "name" : "n-31", "chineseChar": "吴俊森" },
//     { "name" : "n-32", "chineseChar": "万欣怡" },
//     { "name" : "n-33", "chineseChar": "姜昕瑶" },
//     { "name" : "n-34", "chineseChar": "高梓钰" },
//     { "name" : "n-35", "chineseChar": "邓李果" },
//     { "name" : "n-36", "chineseChar": "李梓豪" },
//     { "name" : "n-37", "chineseChar": "胡家康" },
//     { "name" : "n-38", "chineseChar": "肖军" },
//     { "name" : "n-39", "chineseChar": "雷莹" },
//     { "name" : "n-40", "chineseChar": "周佳妮" },
//     { "name" : "n-41", "chineseChar": "陶颖涵" },
//     { "name" : "n-42", "chineseChar": "颜思雨" },
//     { "name" : "n-43", "chineseChar": "张露露" },
//     { "name" : "n-44", "chineseChar": "吴嘉欣" },
//     { "name" : "n-45", "chineseChar": "刘佳朕" },
//     { "name" : "n-46", "chineseChar": "付子晴" },
//     { "name" : "n-47", "chineseChar": "杨忻仪" },
//     { "name" : "n-48", "chineseChar": "张瑶" },
//     { "name" : "n-49", "chineseChar": "余诺希" }
// ];

memberList.subscribe((v) => {
	// memberDB = v;
});


export const loadMembers = (f) => {
    let reader = new FileReader();

    reader.onload = (e) => {
        let content = e.target.result;
        let data = [];

        console.log(content);

        let lines = content.split('\n');

        lines.forEach((lineContent, idx) => {
            if (lineContent.trim() !== '') {
                data.push({
                    "name": `n-${idx}`,
                    "chineseChar": lineContent.trim()
                });
            }
        });
        
        console.log(data);
        memberDB = data;
        localMemberList.set(data);
        alert('上传成功');
    };

    reader.readAsText(f, 'UTF-8');
    while (!reader.readyState === FileReader.DONE) {
        // 空循环等待
    }

    // console.log(content);
    // return content;
}