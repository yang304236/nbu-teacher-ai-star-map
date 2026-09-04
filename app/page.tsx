'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BookOpenText,
  BrainCircuit,
  Download,
  MessageCircleHeart,
  Search,
  Share2,
  Sparkles,
  Stars,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const teachers = [
  {
    id: 'chen',
    name: '陈老师',
    title: '人工智能与模式识别',
    group: '计算机科学与技术系',
    x: 18,
    y: 32,
    glow: 1.08,
    keywords: ['启发式课堂', 'AI 入门', '耐心答疑', '科研引路'],
    wishes: [
      '谢谢您把复杂的模型讲成我们听得懂的故事。',
      '第一次觉得算法不是公式，而是一种解决问题的方法。',
      '愿您新的一年课题顺利，课堂继续发光。',
    ],
  },
  {
    id: 'zhang',
    name: '张老师',
    title: '数字信号处理',
    group: '电子信息工程系',
    x: 35,
    y: 22,
    glow: 0.94,
    keywords: ['信号之光', '严谨细致', '课堂节奏', '实验陪伴'],
    wishes: [
      '每一次实验卡住时，您都把我们从混乱里带出来。',
      '谢谢您让波形、频谱和工程直觉真正连在一起。',
      '祝您教师节快乐，桃李满院。',
    ],
  },
  {
    id: 'lin',
    name: '林老师',
    title: '网络空间安全',
    group: '通信工程系',
    x: 63,
    y: 30,
    glow: 1.16,
    keywords: ['安全边界', '攻防思维', '实践导向', '温和坚定'],
    wishes: [
      '您教会我们的不只是安全技术，还有面对未知的冷静。',
      '课堂上的案例让我们第一次感到专业和现实如此接近。',
      '愿您的每一天都被认真和热爱回应。',
    ],
  },
  {
    id: 'wang',
    name: '王老师',
    title: '嵌入式系统',
    group: '物联网工程系',
    x: 76,
    y: 58,
    glow: 1.02,
    keywords: ['动手实践', '系统思维', '项目驱动', '温暖鼓励'],
    wishes: [
      '谢谢您让一块开发板变成我们理解世界的入口。',
      '每次演示成功，都想起您说“再查一下时序”。',
      '祝老师身体健康，代码少报错，生活多惊喜。',
    ],
  },
  {
    id: 'li',
    name: '李老师',
    title: '数据科学导论',
    group: '信息管理与信息系统系',
    x: 51,
    y: 69,
    glow: 0.9,
    keywords: ['数据素养', '循循善诱', '案例鲜活', '思辨训练'],
    wishes: [
      '谢谢您提醒我们，数据背后首先是人和问题。',
      '您的课堂让我们学会用证据说话。',
      '愿老师在新的学期里继续温柔而有力量。',
    ],
  },
];

const styles = {
  真诚版: '您把知识讲进课堂，也把方向点进我们心里。',
  诗意版: '愿一束星光越过课桌，替我们向您道一声感谢。',
  代码版: 'while (成长) { remember(您的耐心与点拨); }',
  论文致谢版: '谨向您在学习方法、学术视野与成长信心方面给予的指导致以诚挚谢意。',
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function loadLogoDataUri() {
  const response = await fetch('/brand/nbu-logo.png');
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          title?: string;
          description: string;
          inputSchema: object;
          annotations?: {
            readOnlyHint?: boolean;
            untrustedContentHint?: boolean;
          };
          execute: (input: unknown) => unknown;
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(teachers[0].id);
  const [style, setStyle] = useState<keyof typeof styles>('真诚版');
  const [studentLine, setStudentLine] = useState('谢谢老师把晦涩的知识讲得清楚，也把我们带到更远的地方。');
  const [teacherName, setTeacherName] = useState('陈老师');
  const [notice, setNotice] = useState('');
  const selected = teachers.find((teacher) => teacher.id === selectedId) ?? teachers[0];

  const generatedGreeting = useMemo(() => {
    const seed = styles[style];
    return `${teacherName || selected.name}，教师节快乐！${seed} 在宁波大学信息科学与工程学院的星图里，您是同学们反复提起的那颗亮星：${studentLine}`;
  }, [style, studentLine, teacherName, selected.name]);

  const downloadCard = async () => {
    const logo = await loadLogoDataUri();
    const safeName = escapeXml(selected.name);
    const safeTitle = escapeXml(selected.title);
    const safeGreeting = escapeXml(`愿每一次授课都被记得，每一份耐心都被看见。教师节快乐！`);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#07172d"/>
          <stop offset="55%" stop-color="#0d7897"/>
          <stop offset="100%" stop-color="#fff3c0"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1440" fill="url(#bg)"/>
      <circle cx="880" cy="180" r="210" fill="#f6d784" opacity=".16"/>
      <circle cx="180" cy="1160" r="280" fill="#78d9ff" opacity=".12"/>
      <image href="${logo}" x="90" y="92" width="118" height="118"/>
      <text x="232" y="142" fill="#ffe9a8" font-size="34" font-family="Microsoft YaHei, Arial" font-weight="700">宁波大学信息科学与工程学院</text>
      <text x="232" y="190" fill="#d6f5ff" font-size="23" font-family="Arial">Faculty of Electrical Engineering and Computer Science</text>
      <text x="90" y="445" fill="#ffffff" font-size="58" font-family="Microsoft YaHei, Arial" font-weight="700">师恩如星，智启未来</text>
      <text x="90" y="570" fill="#d6f5ff" font-size="34" font-family="Microsoft YaHei, Arial">献给</text>
      <text x="90" y="685" fill="#ffe9a8" font-size="96" font-family="Microsoft YaHei, Arial" font-weight="800">${safeName}</text>
      <text x="90" y="755" fill="#d6f5ff" font-size="34" font-family="Microsoft YaHei, Arial">${safeTitle}</text>
      <rect x="90" y="850" width="900" height="278" rx="18" fill="#ffffff" opacity=".92"/>
      <text x="140" y="930" fill="#10233b" font-size="42" font-family="Microsoft YaHei, Arial" font-weight="700">教师节快乐</text>
      <text x="140" y="1010" fill="#40536a" font-size="34" font-family="Microsoft YaHei, Arial">${safeGreeting}</text>
      <text x="90" y="1270" fill="#fff5cf" font-size="28" font-family="Microsoft YaHei, Arial">2026 教师节 AI 谢师星图</text>
    </svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selected.name}-教师节贺卡.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice('贺卡已生成下载');
  };

  const shareGreeting = async () => {
    const text = `${selected.name}的教师节 AI 谢师星图：${generatedGreeting}`;
    if (navigator.share) {
      await navigator.share({ title: '师恩如星，智启未来', text });
      setNotice('已打开系统分享');
      return;
    }
    await navigator.clipboard.writeText(text);
    setNotice('祝福已复制');
  };

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) {
      return;
    }

    const lifecycle = new AbortController();
    const reportError = (error: unknown) => {
      console.error('WebMCP tool registration failed', error);
    };

    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'read_teacher_star_map',
            title: 'Read teacher star map',
            description: 'Read the currently selected teacher and available teacher IDs.',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
            annotations: { readOnlyHint: true, untrustedContentHint: false },
            execute() {
              return {
                selectedTeacherId: selectedId,
                selectedTeacherName: selected.name,
                availableTeacherIds: teachers.map((teacher) => teacher.id),
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(reportError);

      void Promise.resolve(
        context.registerTool(
          {
            name: 'stage_teacher_greeting',
            title: 'Stage teacher greeting',
            description: 'Select a teacher and generate a visible greeting in one of the supported styles.',
            inputSchema: {
              type: 'object',
              properties: {
                teacherId: { type: 'string', enum: teachers.map((teacher) => teacher.id) },
                style: { type: 'string', enum: Object.keys(styles) },
                studentLine: { type: 'string', minLength: 1, maxLength: 160 },
              },
              required: ['teacherId', 'style', 'studentLine'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input) {
              const value = input as {
                teacherId?: string;
                style?: keyof typeof styles;
                studentLine?: string;
              };
              const nextTeacher = teachers.find((teacher) => teacher.id === value.teacherId);
              if (!nextTeacher || !value.style || !(value.style in styles) || !value.studentLine?.trim()) {
                throw new Error('Please provide a valid teacherId, style, and studentLine.');
              }
              setSelectedId(nextTeacher.id);
              setTeacherName(nextTeacher.name);
              setStyle(value.style);
              setStudentLine(value.studentLine.trim());
              return {
                selectedTeacherId: nextTeacher.id,
                selectedTeacherName: nextTeacher.name,
                style: value.style,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(reportError);
    } catch (error) {
      reportError(error);
    }

    return () => lifecycle.abort();
  }, [selected.name, selectedId]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#07172d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(36,157,201,.38),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(246,192,80,.18),transparent_28%),linear-gradient(135deg,#07172d_0%,#092c49_48%,#123e55_100%)]" />
      <div className="stars-layer" />

      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-3">
          <div className="logo-seal" aria-label="宁波大学校徽">
            <img src="/brand/nbu-logo.png" alt="宁波大学校徽" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide text-[#f6d784]">宁波大学</p>
            <p className="truncate text-xs text-cyan-100/80 sm:text-sm">信息科学与工程学院教师节献礼</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-2 text-sm text-cyan-50 shadow-sm backdrop-blur md:flex">
          <BrainCircuit className="h-4 w-4 text-[#f6d784]" />
          AI 汇总学生心意
        </div>
      </header>

      <section className="relative z-10 grid min-h-[calc(100vh-76px)] gap-5 px-5 pb-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-12">
        <div className="relative min-h-[560px] overflow-hidden rounded-[8px] border border-white/12 bg-white/[.045] shadow-2xl shadow-black/25 backdrop-blur">
          <div className="absolute left-6 top-6 max-w-[620px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f6d784]/35 bg-[#f6d784]/12 px-3 py-1.5 text-sm text-[#ffe9a8]">
              <Stars className="h-4 w-4" />
              2026 教师节 AI 谢师星图
            </div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">师恩如星，智启未来</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-cyan-50/82">
              每一颗星都是一位老师。AI 将学生寄语整理成感谢信、关键词和专属电子贺卡，让扫码进入的瞬间就有仪式感。
            </p>
          </div>

          <svg className="absolute inset-0 h-full w-full" role="img" aria-label="教师星图">
            <defs>
              <linearGradient id="line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#78d9ff" stopOpacity=".18" />
                <stop offset="100%" stopColor="#f6d784" stopOpacity=".34" />
              </linearGradient>
            </defs>
            {teachers.slice(0, -1).map((teacher, index) => {
              const next = teachers[index + 1];
              return (
                <line
                  key={teacher.id}
                  x1={`${teacher.x}%`}
                  y1={`${teacher.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="url(#line)"
                  strokeWidth="1.5"
                />
              );
            })}
            <line x1="18%" y1="32%" x2="51%" y2="69%" stroke="url(#line)" strokeWidth="1.5" />
            <line x1="35%" y1="22%" x2="76%" y2="58%" stroke="url(#line)" strokeWidth="1.5" />
          </svg>

          <div className="absolute inset-0">
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
                className={`star-node ${selected.id === teacher.id ? 'active' : ''}`}
                style={{
                  left: `${teacher.x}%`,
                  top: `${teacher.y}%`,
                  transform: `translate(-50%, -50%) scale(${teacher.glow})`,
                }}
                onClick={() => {
                  setSelectedId(teacher.id);
                  setTeacherName(teacher.name);
                }}
                aria-label={`查看${teacher.name}的祝福`}
              >
                <span />
                <strong>{teacher.name}</strong>
                <em>{teacher.title}</em>
              </button>
            ))}
          </div>

          <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
            {[
              ['AI 情感摘要', '学生寄语生成专属感谢信'],
              ['AI 关键词提取', '自动整理课堂记忆标签'],
              ['AI 贺卡生成', '一师一图，扫码即得'],
            ].map(([label, text]) => (
              <div key={label} className="rounded-[8px] border border-white/10 bg-black/18 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-[#f6d784]">{label}</p>
                <p className="mt-1 text-sm text-cyan-50/75">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="grid gap-5">
          <section className="rounded-[8px] border border-white/14 bg-white/[.92] p-5 text-[#10233b] shadow-2xl shadow-black/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{selected.group}</p>
                <h2 className="mt-1 text-3xl font-semibold">{selected.name}</h2>
                <p className="mt-1 text-sm font-medium text-[#14779a]">{selected.title}</p>
              </div>
              <Sparkles className="h-6 w-6 text-[#ca941f]" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full bg-[#e9f7fb] px-3 py-1 text-sm text-[#12627f]">
                  {keyword}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-[#d8e7ed] bg-[#f8fcfd] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0d5b78]">
                <MessageCircleHeart className="h-4 w-4" />
                同学们眼中的您
              </div>
              <p className="text-base leading-8 text-slate-700">
                AI 已从学生寄语中提炼出这份感谢：您把专业知识讲得清楚，也把探索未知的勇气留给同学们。那些课堂上的提醒、实验里的等待、答疑时的耐心，都会成为大家继续向前的星光。
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {selected.wishes.map((wish) => (
                <p key={wish} className="rounded-[8px] bg-slate-100 px-3 py-2 text-sm text-slate-650">
                  {wish}
                </p>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] border border-[#f6d784]/24 bg-[#fff9e8] p-5 text-[#15233a] shadow-xl shadow-black/15">
            <div className="teacher-card">
              <div className="flex items-center gap-3">
                <img src="/brand/nbu-logo.png" alt="宁波大学校徽" className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-sm font-semibold text-[#7d5a14]">宁波大学信息科学与工程学院</p>
                  <p className="text-xs text-slate-500">Faculty of Electrical Engineering and Computer Science</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">献给</p>
                <p className="mt-1 text-4xl font-semibold text-[#10233b]">{selected.name}</p>
                <p className="mt-4 text-lg leading-8 text-slate-700">
                  愿每一次授课都被记得，每一份耐心都被看见。教师节快乐！
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-[#0d7897] text-white hover:bg-[#09647f]" onClick={downloadCard}>
                <Download className="h-4 w-4" />
                保存贺卡
              </Button>
              <Button variant="outline" className="border-[#dec36b] bg-white/55" onClick={shareGreeting} aria-label="分享祝福">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            {notice ? <p className="mt-2 text-center text-sm text-[#7d5a14]">{notice}</p> : null}
          </section>
        </aside>
      </section>

      <section className="relative z-10 grid gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_430px] lg:px-12">
        <div className="rounded-[8px] border border-white/12 bg-white/[.075] p-5 backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-[#f6d784]" />
            <h2 className="text-xl font-semibold">AI 祝福生成器</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-[220px_1fr]">
            <Input
              value={teacherName}
              onChange={(event) => setTeacherName(event.target.value)}
              className="border-white/15 bg-white/90 text-[#10233b]"
              aria-label="老师姓名"
            />
            <Tabs value={style} onValueChange={(value) => setStyle(value as keyof typeof styles)}>
              <TabsList className="grid w-full grid-cols-4 bg-white/10">
                {Object.keys(styles).map((item) => (
                  <TabsTrigger key={item} value={item} className="text-sm">
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <Textarea
            value={studentLine}
            onChange={(event) => setStudentLine(event.target.value)}
            className="mt-3 min-h-24 border-white/15 bg-white/90 text-[#10233b]"
            aria-label="学生寄语"
          />
          <div className="mt-4 rounded-[8px] border border-white/12 bg-black/18 p-4 text-base leading-8 text-cyan-50">
            {generatedGreeting}
          </div>
        </div>

        <div className="rounded-[8px] border border-white/12 bg-white/[.075] p-5 backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <BookOpenText className="h-5 w-5 text-[#f6d784]" />
            <h2 className="text-xl font-semibold">活动数据怎么换</h2>
          </div>
          <div className="space-y-3 text-sm leading-7 text-cyan-50/82">
            <p>把老师姓名、系所、课程方向、学生寄语整理成表格后，就能批量替换页面里的示例数据。</p>
            <p>正式版建议提前生成每位老师的感谢信，现场页面只展示结果，稳定不怕接口拥堵。</p>
            <p>保留一个祝福生成器作为互动入口，既有 AI 特色，也不会影响主流程。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
