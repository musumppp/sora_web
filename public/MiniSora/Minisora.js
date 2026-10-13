
const DialogueText = ['不按1000下就不让你回去!','才，才不是为了你才这样做的呢!','你笨蛋吗!?','便当，给你做吧!  唉? 不用客气哦!',
'甲，好~喜欢!   随，随便说的……','この広い空が映りますように…','不要一直潜在网络上啦...关心我一下嘛','不管怎么努力也没法再提高水平了哦，因为已经是满分了',
'呐，其实啊。你，抬头看到天空时会不会想起我呢','诺依医生......!!我想开战斗用电子体......','真是没办法呢，甲啊',
'慢慢来哦！','你们中如果有记忆丧失的军人，佣兵，原学生的话请来找我!  以上!','甲，想再一次…和你说说话。想…和你在微风中交谈。',
'甲，今天一定要吃哦。焦糖盖浇饭','就连小孩子也想试试看。潜入网络之后，会这样说哦。Qoo－!','门仓甲! 别以为这样就赢了哦——!',
'在我名字前面加一个恋字也不会变成令人心痛的恋爱物语哦!','『韭菜酱』这个外号，明明觉得最好不过了','这也算是男人吗，软脚虾！',
'哪有没被打过就成长起来的人！','这就是影狼…好厉害…难怪甲那么着迷','咦～为什么咖喱会变成群青色嘛～～～！','喝酒要等到二十岁以后！','才不是内裤……呃，呜哇真的是内裤！',
'你说什么！？','禁，禁止说难为情的台词！！','这个变态ＮＰＣ色情狂！','什什什什什什什么～！干嘛那样直直盯着人家的腋窝看啊！变态！！','我们２４小时，都在网络中连接着。………你呢？',
'我们～是～统合～政～府军～','变态！　变态！　变态！','ＡＩ是阻止不了的！','甲，赶快回去继续攻略我啦！','哈啊？傲娇？谁会对你这种家伙娇啊！','要，要不要买左撇子用的贝斯呢……会更受欢迎吗？',
'甲真是的，对女生就是没节操…','甲这个笨蛋！　绝对不会喜欢上你这种家伙的…','抱歉，其实我并不是喜欢你……是非常喜欢','这是特意调制的深蓝色口味！','绝对不会和甲做…','我的料理是什么颜色！','在我心里…有一个像镜子一样的我……那孩子，我很喜欢哦…',
'甲是个大笨蛋。在一起那么久了还分不清人家是认真还是开玩笑…','那个…那是…禁止事项哦！','所以说甲是个大笨蛋啦！','ＤＩＶＥ一天一个小时！明白吗？','我不会忘记哦。那里曾有着…无可替代的…天空…',
'捏','ＹＥＳ！']

//问候对话--------
const morningGreetings = [
    '早安～',
    '清晨的阳光真舒服，昨晚睡得好吗？',
    '新的一天开始啦',
    '早上好，今天有什么计划吗？'
];
const afternoonGreetings = [
    '中午好～',
    '午后的阳光有点慵懒呢，休息一下吧',
    '午饭吃了吗？要不要尝尝我做的咖喱？',
    '午后容易犯困，起来活动活动吧'
];
const eveningGreetings = [
    '晚上好～',
    '别熬太晚哦',
    '愿你今晚有个好梦',
    '今天过得开心吗？明天也要加油！'
];
//====================对话定义==================
const dialogue = [{"DialogueContent":DialogueText[0],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_01.ogg",
                   "SpriteMode":0  },
                   {"DialogueContent":DialogueText[1],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_02.ogg",
                   "SpriteMode":1  },
                   {"DialogueContent":DialogueText[2],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_03.ogg",
                   "SpriteMode":2  },
                   {"DialogueContent":DialogueText[3],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_04.ogg",
                   "SpriteMode":3  },
                   {"DialogueContent":DialogueText[4],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_05.ogg",
                   "SpriteMode":4  },
                    {"DialogueContent":DialogueText[5],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_06.ogg",
                   "SpriteMode":5  },
                   {"DialogueContent":DialogueText[6],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_07.ogg",
                   "SpriteMode":6  },
                   {"DialogueContent":DialogueText[7],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_08.ogg",
                   "SpriteMode":7  },
                   {"DialogueContent":DialogueText[8],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_09.ogg",
                   "SpriteMode":8  },
                   {"DialogueContent":DialogueText[9],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_10.ogg",
                   "SpriteMode":9  },
                   {"DialogueContent":DialogueText[10],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_11.ogg",
                   "SpriteMode":10  },
                   {"DialogueContent":DialogueText[11],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_12.ogg",
                   "SpriteMode":11  },
                   {"DialogueContent":DialogueText[12],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_13.ogg",
                   "SpriteMode":12  },
                   {"DialogueContent":DialogueText[13],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_14.ogg",
                   "SpriteMode":13  },
                   {"DialogueContent":DialogueText[14],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_15.ogg",
                   "SpriteMode":14  },
                   {"DialogueContent":DialogueText[15],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_16.ogg",
                   "SpriteMode":15  },
                   {"DialogueContent":DialogueText[16],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_17.ogg",
                   "SpriteMode":16  },
                   {"DialogueContent":DialogueText[17],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_18.ogg",
                   "SpriteMode":17  },
                   {"DialogueContent":DialogueText[18],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_19.ogg",
                   "SpriteMode":18  },
                   {"DialogueContent":DialogueText[19],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_20.ogg",
                   "SpriteMode":19  },
                   {"DialogueContent":DialogueText[20],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_21.ogg",
                   "SpriteMode":20  },
                   {"DialogueContent":DialogueText[21],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_22.ogg",
                   "SpriteMode":21  },
                   {"DialogueContent":DialogueText[22],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_23.ogg",
                   "SpriteMode":22  },
                   {"DialogueContent":DialogueText[23],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_24.ogg",
                   "SpriteMode":23  },
                   {"DialogueContent":DialogueText[24],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_25.ogg",
                   "SpriteMode":24  },
                   {"DialogueContent":DialogueText[25],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_26.ogg",
                   "SpriteMode":25  },
                   {"DialogueContent":DialogueText[26],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_27.ogg",
                   "SpriteMode":26  },
                   {"DialogueContent":DialogueText[27],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_28.ogg",
                   "SpriteMode":27  },
                   {"DialogueContent":DialogueText[28],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_29.ogg",
                   "SpriteMode":28  },
                   {"DialogueContent":DialogueText[29],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_30.ogg",
                   "SpriteMode":29  },
                   {"DialogueContent":DialogueText[30],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_31.ogg",
                   "SpriteMode":30  },
                   {"DialogueContent":DialogueText[31],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_32.ogg",
                   "SpriteMode":31  },
                   {"DialogueContent":DialogueText[32],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_33.ogg",
                   "SpriteMode":32  },
                   {"DialogueContent":DialogueText[33],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_34.ogg",
                   "SpriteMode":33  },
                   {"DialogueContent":DialogueText[34],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_35.ogg",
                   "SpriteMode":34  },
                   {"DialogueContent":DialogueText[35],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_36.ogg",
                   "SpriteMode":35  },
                   {"DialogueContent":DialogueText[36],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_37.ogg",
                   "SpriteMode":36  },
                   {"DialogueContent":DialogueText[37],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_38.ogg",
                   "SpriteMode":37  },
                   {"DialogueContent":DialogueText[38],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_39.ogg",
                   "SpriteMode":38  },
                   {"DialogueContent":DialogueText[39],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_40.ogg",
                   "SpriteMode":39  },
                   {"DialogueContent":DialogueText[40],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_41.ogg",
                   "SpriteMode":40  },
                   {"DialogueContent":DialogueText[41],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_42.ogg",
                   "SpriteMode":41  },
                   {"DialogueContent":DialogueText[42],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_43.ogg",
                   "SpriteMode":42  },
                   {"DialogueContent":DialogueText[43],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_44.ogg",
                   "SpriteMode":43  },
                   {"DialogueContent":DialogueText[44],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_45.ogg",
                   "SpriteMode":44  },
                   {"DialogueContent":DialogueText[45],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_46.ogg",
                   "SpriteMode":45  },
                   {"DialogueContent":DialogueText[46],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_47.ogg",
                   "SpriteMode":46  },
                   {"DialogueContent":DialogueText[47],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_48.ogg",
                   "SpriteMode":47  },
                   {"DialogueContent":DialogueText[48],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_49.ogg",
                   "SpriteMode":48  },
                   {"DialogueContent":DialogueText[49],
                   "AudioName":"/MiniSora/assets/voice/Sora_Mascot_50.ogg",
                   "SpriteMode":49  }
]

//资源列表
// 立绘URL（预加载用）
const spritePaths = [
    '/MiniSora/assets/cute_sora/daily/SORA_0101BS.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0102EG.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0102NK.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0103BS.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0104BS.webp',
    '/MiniSora/assets/cute_sora/daily/SORA_0105BS.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__eg.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__ik.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__ka.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__ks.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__ky.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__mu.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__no.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0101bs__tr.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0102eg__ik.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__eg.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__ir.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__km.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__ky.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__ky2.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__mu.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__ne.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__nk.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__nr.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__sa.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0103bs__ze.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__2.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__eg.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ir.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__km.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__kr.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ks.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ky.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ky2.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ne.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__nk.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__nr.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ny.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__sa.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0104bs__ze.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__kn.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__ks.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__ky.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__mh.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__sk.webp',
    '/MiniSora/assets/cute_sora/daily/sora_0105bs__sk2.webp'
];

// 语音URL（预加载用）
const voicePaths = dialogue.map(item => item.AudioName);



//定义立绘模式

//========================================================定义动作
const Action = {
        'low_jump': {//动作描述接动作执行内容，以下同
            TimeCost: '800ms',
            description: '图片快速向上移动2vh随后复位',
            execute: () => {//使用promise解决异步问题
                return new Promise((resolve) => {
                    // 获取最新DOM元素，防止null报错
                    const sprite = document.getElementById('character-sprite');
                    if (!sprite) { resolve(); return; }

                    sprite.style.transition = 'transform 0.3s ease';//这个设置跳跃的快慢速度，300ms为跳转时间
                    sprite.style.transform = 'translate(-50%, calc(-50% - 2vh))';//图片向上移动15px
                    //外层的setTimeout：等待300毫秒后执行复位操作，这个延迟是为了让前面的"上跳15px"动画有足够时间显示出来
                    //内层的setTimeout：在复位动画完成后，再延迟200毫秒才 resolve Promise，这是为了确保 CSS transition 动画真正执行完毕
                    setTimeout(() => {
                        sprite.style.transform = 'translate(-50%, -50%)';
                        setTimeout(resolve, 200);
                    }, 300);
                });
            }
        },

        'high_jump': {
            TimeCost:'2000ms',
            description: '较慢向上移动3vh后保持0.5秒后复位',
            execute: () => {
                return new Promise((resolve) => {
                    const sprite = document.getElementById('character-sprite');
                    if (!sprite) { resolve(); return; }

                    sprite.style.transition = 'transform 0.6s ease';
                    sprite.style.transform = 'translate(-50%, calc(-50% - 3vh))';

                    setTimeout(() => {
                        sprite.style.transition = 'transform 0.4s ease';
                        sprite.style.transform = 'translate(-50%, -50%)';
                        setTimeout(resolve, 400);
                    }, 500);
                });
            }
        },

        'shyBow': {
            TimeCost:'1400ms',
            description: '害羞时低头，缩小一点',
            execute: () => {
                return new Promise((resolve) => {
                    const sprite = document.getElementById('character-sprite');
                    if (!sprite) { resolve(); return; }

                    sprite.style.transition = 'transform 0.3s ease';
                    sprite.style.transform = 'translate(-50%, -50%) scale(0.9)';

                    setTimeout(() => {
                        sprite.style.transition = 'transform 0.5s ease';
                        sprite.style.transform = 'translate(-50%, -50%)';
                        setTimeout(resolve, 500);
                    }, 900);
                });
            }
        },
        'fast_jump':{
        TimeCost:'200ms',
        description: '图片极快速向上移动1.5vh随后复位',
        execute: () => {
           return new Promise((resolve) => {
                     const sprite = document.getElementById('character-sprite');
                     if (!sprite) { resolve(); return; }

                     sprite.style.transition = 'transform 0.1s ease';
                     sprite.style.transform = 'translate(-50%, calc(-50% - 1.5vh))';
                     setTimeout(() => {
                     sprite.style.transform = 'translate(-50%, -50%)';
                     setTimeout(resolve, 100);
                     },100)
           })
        }
        },
        'fast_high_jump':{
            TimeCost:'400ms',
            description: '图片极快速向上移动3vh随后复位',
            execute: () => { 
                return new Promise((resolve) => { 
                    const sprite = document.getElementById('character-sprite');
                    if (!sprite) { resolve(); return; }
                    sprite.style.transition = 'transform 0.2s ease';
                    sprite.style.transform = 'translate(-50%, calc(-50% - 3vh))';
                    setTimeout(() => { 
                    sprite.style.transform = 'translate(-50%, -50%)';
                    setTimeout(resolve, 200);
                    },200)
                })
            }
},
       

        'very_slow_shake':{
            TimeCost:'3000ms',
            description: '图片极慢地向左右中幅度摇摆，最后复位',
            execute: () => { 
                return new Promise((resolve) => { 
                    const sprite = document.getElementById('character-sprite');
                    if (!sprite) { resolve(); return; }
                    
                    const translateX = 2.3;
                    
                    sprite.style.transition = 'transform 0.3s ease-out';
                    sprite.style.transform = `translate(calc(-50% - ${translateX}vw), -50%)`;
                    
                    setTimeout(() => {
                        sprite.style.transition = 'transform 0.3s ease-out';
                        sprite.style.transform = `translate(calc(-50% + ${translateX}vw), -50%)`;
                    }, 1000);
                    
                    setTimeout(() => {
                        sprite.style.transition = 'transform 0.3s ease-out';
                        sprite.style.transform = `translate(calc(-50% - ${translateX}vw), -50%)`;
                    }, 1900);
                    
                    setTimeout(() => {
                        sprite.style.transition = 'transform 0.3s ease-out';
                        sprite.style.transform = 'translate(-50%, -50%)';
                        setTimeout(resolve, 300);
                    }, 2800);
                })
            }
        }

    
    
    }
    


        
   









//===================水无月空吉祥物控制脚本===============

//DOM元素 (这里不再直接赋值，因为脚本加载时DOM可能不存在，改为在函数中获取)(vue框架优化后的产物)
// const CharacterSprite = document.getElementById('character-sprite')
// const DialogueTextElement = document.getElementById('dialogue-text')
// const DialogueBubble = document.getElementById('dialogue-bubble')

let playId = 0;

//当前对话控制————防止对话叠加
let currentDialogueId = null;
let isPlaying = false;

//======================================音频播放器
class audioPlayer {
    constructor(AudioName) {
        this.AudioName = AudioName;
        this.audio = null;
    }
    
    playAudio() {
        return new Promise((resolve, reject) => {
            // 如果已有音频，先清理
            if (this.audio) {
                this.cleanup();
            }
            
            this.audio = new Audio(this.AudioName);
            
            this.audio.onended = () => {
                this.cleanup();
                resolve();
            };
            
            this.audio.onerror = (error) => {
                this.cleanup();
                reject(error);
            };
            
            // 开始播放
            this.audio.play().catch((error) => {
                this.cleanup();
                reject(error);
            });
        });
    }
    
    cleanup() {
        if (this.audio) {
            try {
                this.audio.pause();
                this.audio.src = '';
                this.audio.load();
            } catch (e) {
                // 忽略清理错误
            }
            this.audio.onended = null;
            this.audio.onerror = null;
            this.audio = null;
        }
    }
    
    // 外部可以主动调用清理
    destroy() {
        this.cleanup();
    }
}
//===================================立绘播放器
class spritePlayer{
    constructor(SpriteMode){
        this.SpriteMode=SpriteMode;


    }
    async initSpriteShow() {
        //设置初始立绘————暂定只有一种服装状态
        const CharacterSprite = document.getElementById('character-sprite');
        if (!CharacterSprite) {
            console.warn('CharacterSprite element not found for initSpriteShow');
            return;
        }
        CharacterSprite.src = '/MiniSora/assets/cute_sora/daily/sora_0101bs__eg.webp';
        CharacterSprite.style.transform = 'translate(-50%, -50%)';

    }
    ChangeSprite(src) {
        const CharacterSprite = document.getElementById('character-sprite');
        if (!CharacterSprite) return;
        CharacterSprite.src = src;
     }
    //定义动作模式（对应对话序号）
//==================================================定义对话动作模式============================
    ActionMode() {
        return new Promise((resolve, reject) => {
    switch (this.SpriteMode) {

    //================对话0
    case 0 :
         this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ka.webp');
         setTimeout(() =>{resolve();},2000);
         break;
    //================对话1
    case 1 :
         this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp');
         
         setTimeout(() =>{resolve();},2000);
         break;
    //================对话2
    case 2 : 
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ks.webp');
        setTimeout(() =>{resolve();},1000);
         break;
    //================对话3
    case 3 :
       this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0104BS.webp');
       setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__tr.webp');},2000);
       setTimeout(() =>{resolve ();},3000);
        break;
    //================对话4
    case 4 : 
         this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__eg.webp');
         //每次切换完立绘后一定不能直接进行动作！！至少要进行短暂的setTimeout
         setTimeout(() =>{Action.low_jump.execute();},100);
         setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__nr.webp');},2656);
         setTimeout(() =>{Action.shyBow.execute();},3000);

        //resolve时间应为最后一个操作开始时间+操作持续时间
         setTimeout(() =>{resolve();},4500);
          break;
    //===============对话5
    case 5:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0105BS.webp');
        setTimeout(() =>{resolve();},7000);
        break;
    //==============对话6
    case 6:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__sk.webp');
        setTimeout(() =>{Action.low_jump.execute();},100);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__kn.webp');},2000);
        setTimeout(() =>{resolve();},4000);
        break;
    //==============对话7
    case 7:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ka.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__eg.webp');},3845);
        setTimeout(() =>{resolve();},5000);
        break;
    //=============对话8
    case 8:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ir.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__km.webp');},2250);
        setTimeout(() =>{resolve();},5000);
        break;
    //=============对话9
    case 9:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__mu.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ik.webp');},2500);
        setTimeout(() =>{resolve();},4000);
        break;
    //=============对话10
    case 10:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__no.webp');
        setTimeout(() =>{resolve();},2000);
        break;
    //=============对话11
    case 11:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0103BS.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //=============对话12
    case 12:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ka.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__mu.webp');},900);
        setTimeout(() =>{Action.fast_jump.execute();},1050);
        setTimeout(() =>{Action.fast_jump.execute();},1700);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__sk.webp');},2500);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ze.webp');},5800);
        setTimeout(() =>{resolve();},6000);
        break;
    //=============对话13
    case 13:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__sa.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //=============对话14
    case 14:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ky2.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ny.webp');},2700);
        setTimeout(() =>{resolve();},4000);
        break;
    //=============对话15
    case 15:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__2.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0103BS.webp');},4000);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__eg.webp');},5800);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102EG.webp');},8550);
        setTimeout(() =>{Action.high_jump.execute();},8650);
        setTimeout(() =>{resolve();},10700);
        break;
    //=============对话16
    case 16:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ir.webp');},1500);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ze.webp');},2965);
        setTimeout(() =>{resolve();},3200);
        break;
    //=============对话17
    case 17:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ne.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__eg.webp');},2900);
        setTimeout(() =>{resolve();},5000);
        break;
    //=============对话18
    case 18:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ne.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ir.webp');},1700);
        setTimeout(() =>{resolve();},3400);
        break;
    //=============对话19
    case 19:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__mu.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ze.webp');},1500);
        setTimeout(() =>{resolve();},2000);
        break;
    //=============对话20
    case 20:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ks.webp');},1540);
        setTimeout(() =>{resolve();},2000);
        break;
    //=============对话21
    case 21:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ky.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ir.webp');},1800);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ks.webp');},3550);
        setTimeout(() =>{resolve();},5000);
        break;
    //=============对话22
    case 22:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ze.webp');
        setTimeout(() =>{Action.low_jump.execute();},100);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__nk.webp');},1250);
        setTimeout(() =>{Action.shyBow.execute();},1400);
        setTimeout(() =>{resolve();},4000);
        break;
    //=============对话23
    case 23:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0105BS.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //=============对话24
    case 24:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ir.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp');},2150);
        setTimeout(() =>{Action.fast_high_jump.execute();},2300);
        setTimeout(() =>{resolve();},3500);
        break;
    //=============对话25
    case 25:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102NK.webp');
        setTimeout(() =>{Action.fast_high_jump.execute();},100);
        setTimeout(() =>{resolve();},1000);
        break;
    //=============对话26
    case 26:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ky.webp');
        setTimeout(() =>{Action.fast_jump.execute();},100);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__km.webp');},700);
        setTimeout(() =>{Action.low_jump.execute();},800);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ir.webp');},2300);
        setTimeout(() =>{resolve();},2400);
        break;
    //============对话27
    case 27:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp');
        setTimeout(() =>{Action.low_jump.execute();},100);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102NK.webp');},800);
        setTimeout(() =>{resolve();},2000);
        break;
    //============对话28
    case 28:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp');
        setTimeout(() =>{Action.high_jump.execute();},1100);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0102eg__ik.webp');},1800);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102NK.webp');},4300);
        setTimeout(() =>{resolve();},4500);
        break;
    //============对话29
    case 29:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__no.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__eg.webp');},5350);
        setTimeout(() =>{resolve();},6000);
        break;
    //============对话30
    case 30:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0103BS.webp');
        setTimeout(() =>{Action.very_slow_shake.execute();},100);
        setTimeout(() =>{resolve();},3400);
        break;
    //============对话31
    case 31:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ze.webp');
        setTimeout(() =>{Action.fast_jump.execute();},100);
        setTimeout(() =>{Action.low_jump.execute();},950);
        setTimeout(() =>{Action.high_jump.execute();},1800);
        setTimeout(() =>{resolve();},2300);
        break;
    //============对话32
    case 32:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0101BS.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //============对话33
    case 33:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ky2.webp');
        setTimeout(() =>{Action.low_jump.execute();},100);
        setTimeout(() =>{resolve();},1500);
        break;
    //============对话34
    case 34:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__tr.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp');},2600);
        setTimeout(() =>{resolve();},4000);
        break;
    //============对话35
    case 35:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ks.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ir.webp');},5000);
        setTimeout(() =>{resolve();},5500);
        break;
    //============对话36
    case 36:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__mu.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ze.webp');},1100);
        setTimeout(() =>{Action.fast_jump.execute();},1200);
        setTimeout(() =>{resolve();},2800);
        break;
    //============对话37
    case 37:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__sa.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__nk.webp');},1350);
        setTimeout(() =>{resolve();},3000);
        break;
    //============对话38
    case 38:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ks.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__mh.webp');},1250);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0103BS.webp');},5650);
        setTimeout(() =>{resolve();},6000);
        break;
    //============对话39
    case 39:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102EG.webp');
        setTimeout(() =>{resolve();},2000);
        break;
    //============对话40
    case 40:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__km.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //============对话41
    case 41:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0102eg__ik.webp');
        setTimeout(() =>{resolve();},1000);
        break;
    //============对话42
    case 42:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__sk2.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__sk.webp');},1500);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__ks.webp');},5300);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0105BS.webp');},8250);
        setTimeout(() =>{resolve();},8700);
        break;
    //============对话43
    case 43:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__ky.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__km.webp');},1950);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__nr.webp');},3750);
        setTimeout(() =>{resolve();},5000);
        break;
    //============对话44
    case 44:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ky.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ir.webp');},1300);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp');},3150);
        setTimeout(() =>{resolve();},4000);
        break;
    //============对话45
    case 45:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__kr.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ik.webp');},950);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102NK.webp');},2100);
        setTimeout(() =>{Action.fast_high_jump.execute();},2200);
        setTimeout(() =>{resolve();},2800);
        break;
    //============对话46
    case 46:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0103bs__ne.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0104BS.webp');},2150);
        setTimeout(() =>{resolve();},2700);
        break;
    //============对话47
    case 47:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__kn.webp');
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__sa.webp');},2650);
        setTimeout(() =>{this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0105bs__sk2.webp');},5150);
        setTimeout(() =>{resolve();},7000);
        break;
    //============对话48
    case 48:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ky.webp');
        setTimeout(() =>{resolve();},400);
        break;
    //============对话49
    case 49:
        this.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0104bs__ky2.webp');
        setTimeout(() =>{resolve();},600);
        break;

}
    })
    }
}
//=================================文本播放器
class dialoguePlayer{
    constructor(DialogueContent){
    this.DialogueContent=DialogueContent;
    }
    DialogueShow() {
       const DialogueBubble = document.getElementById('dialogue-bubble');
       const DialogueTextElement = document.getElementById('dialogue-text');
       
       if (!DialogueBubble || !DialogueTextElement) {
           console.warn('Dialogue elements not found');
           return;
       }

       //显示对话框
       DialogueBubble.style.display = 'block';
       //显示对话内容
       DialogueTextElement.textContent = this.DialogueContent;
    }


}
//隐藏对话框
function hideDialogue() {
     const DialogueBubble = document.getElementById('dialogue-bubble');
     if (DialogueBubble) {
         DialogueBubble.style.display = 'none';
     }
}
//看板娘互动集合类
class interact {
      constructor(dialogueId) {
      this.dialogueId = dialogueId;
      }
      async play() {

         const myId = Date.now() + Math.random();
         currentDialogueId = myId;

         const audio = new audioPlayer(dialogue[this.dialogueId].AudioName);//这里直接传入具体数据内容
         const text = new dialoguePlayer(DialogueText[this.dialogueId]);
         const action = new spritePlayer(dialogue[this.dialogueId].SpriteMode);
         await Promise.all([audio.playAudio(),text.DialogueShow(),action.ActionMode()]);

         if (currentDialogueId === myId) {
             setTimeout(() => {
                hideDialogue();
                //播放结束
                isPlaying = false;
             }, 500);
         }
      }

}

function showTimeGreeting() {
    if (isPlaying) return;
    const hour = new Date().getHours();
    let greetingList;
    if (hour >= 6 && hour < 11) greetingList = morningGreetings;
    else if (hour >= 11 && hour < 14) greetingList = afternoonGreetings;
    else if (hour >= 19 && hour < 23) greetingList = eveningGreetings;
    else if (hour >= 23 || hour < 6) greetingList = ['这么晚了还不赶紧去睡觉！'];
    else return; 
    const randomIndex = Math.floor(Math.random() * greetingList.length);
    const text = greetingList[randomIndex];
    const dialog = new dialoguePlayer(text);
    isPlaying = true;
    dialog.DialogueShow();
    setTimeout(() => {
        hideDialogue();
        isPlaying = false;

    }, 3000); // 三秒自动隐藏
}
//-----------------------预加载资源
//预加载图片
function preload_image(){
     spritePaths.forEach(src => {
        const img = new Image();
        img.src = src;
     })
}
//预加载语音
function preload_audio(){
     voicePaths.forEach(src => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = src;
        audio.load();

     })
}

//绑定事件
function bindEvent() {
         const CharacterSprite = document.getElementById('character-sprite');
         
         if (!CharacterSprite) {
             console.error('bindEvent failed: CharacterSprite not found in DOM');
             return;
         }

         CharacterSprite.addEventListener('click', () => {
             if (isPlaying) return;
             //记录播放，防止播放中重复播放
             isPlaying = true;
             //测试用————第一条对话--生产环境用随机数
             playId = Math.floor(Math.random() * 50);//用于对话随机
            //测试时填入具体对话
        //    playId = 30;
             const interactor = new interact(playId);
             interactor.play();
         });
}

window.infoCard = function (id) {
     if(id === 1){
         if(isPlaying){
            return;
         }
         isPlaying = true;
         const sprite_to_info = new spritePlayer();
         const dialogue_to_info = new dialoguePlayer('?。。。。。。');
         dialogue_to_info.DialogueShow();
         setTimeout(() => sprite_to_info.ChangeSprite('/MiniSora/assets/cute_sora/daily/sora_0101bs__ks.webp'),100);
         
    setTimeout(() => {
        hideDialogue();
        isPlaying = false;

    }, 2000); 
        }
        else if(id === 2){
         if(isPlaying){
            return;
         }
         isPlaying = true;
         const sprite_to_info = new spritePlayer();
         const dialogue_to_info = new dialoguePlayer('何意味！');
         dialogue_to_info.DialogueShow();
         setTimeout(() => sprite_to_info.ChangeSprite('/MiniSora/assets/cute_sora/daily/SORA_0102OD.webp'),100);
         
    setTimeout(() => {
        hideDialogue();
        isPlaying = false;

    }, 2000); 
        }
        else{
            return;
        }
}
//初始化
function initMiniSora() {
       preload_image();
       preload_audio();
      //绑定事件
      bindEvent ();

      //设置初始立绘
      const sprite= new spritePlayer();
      sprite.initSpriteShow();
      setTimeout(() =>showTimeGreeting(),600);
}

//初始化执行
document.addEventListener('DOMContentLoaded', initMiniSora);
