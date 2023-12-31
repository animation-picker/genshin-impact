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