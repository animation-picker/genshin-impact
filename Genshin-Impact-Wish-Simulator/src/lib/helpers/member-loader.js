import { memberList } from "$lib/store/app-stores";
import { localMemberList } from "./dataAPI/api-localstore";


export let memberDB = [];

memberList.subscribe((v) => {
	memberDB = v;
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
                let arr = lineContent.split(' ');
                data.push({
                    "name": `n-${idx}`,
                    "chineseChar": arr.length == 2? arr[1].trim() : lineContent.trim(),
                    "rarity": arr.length == 2 ? parseInt(arr[0]) : 3
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