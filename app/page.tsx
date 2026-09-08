'use client';

import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import {
  BrainCircuit,
  Download,
  MessageCircleHeart,
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
    name: '学术星',
    color: '#f6d784',
    group: '无需提前收集名单',
    x: 16,
    y: 42,
    glow: 1.08,
    keywords: ['启发思考', '算法之光', '科研引路', '耐心答疑'],
    memory: '您把复杂的问题拆成清晰的路径，也把面对未知的勇气留给同学们。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'zhang',
    name: '启智星',
    color: '#78d9ff',
    group: '无需提前收集名单',
    x: 32,
    y: 34,
    glow: 0.94,
    keywords: ['严谨细致', '工程直觉', '实验陪伴', '连接未来'],
    memory: '那些图像、波形、频谱和系统，在您的课堂里慢慢变成可理解的世界。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'lin',
    name: '信号星',
    color: '#a7f3d0',
    group: '无需提前收集名单',
    x: 53,
    y: 42,
    glow: 1.16,
    keywords: ['安全边界', '攻防思维', '实践导向', '温和坚定'],
    memory: '您让同学们懂得，技术不仅是能力，也是一份面对真实世界的责任。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'wang',
    name: '守护星',
    color: '#c4b5fd',
    group: '无需提前收集名单',
    x: 74,
    y: 36,
    glow: 1.02,
    keywords: ['动手实践', '系统思维', '项目驱动', '温暖鼓励'],
    memory: '从一块开发板到一个完整系统，您陪同学们把想法落到真实运行的瞬间。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'li',
    name: '创客星',
    color: '#fb923c',
    group: '无需提前收集名单',
    x: 84,
    y: 58,
    glow: 0.9,
    keywords: ['循循善诱', '认真负责', '课堂温度', '长期陪伴'],
    memory: '您讲授的是知识，托举的是信心，留下的是一届又一届学生继续向前的底气。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'math',
    name: '引路星',
    color: '#f9a8d4',
    group: '无需提前收集名单',
    x: 62,
    y: 70,
    glow: 0.86,
    keywords: ['逻辑清晰', '抽象能力', '模型意识', '步步推演'],
    memory: '您让公式不再停留在纸面，而成为同学们理解系统与世界的语言。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'software',
    name: '工程星',
    color: '#93c5fd',
    group: '无需提前收集名单',
    x: 39,
    y: 72,
    glow: 0.98,
    keywords: ['架构意识', '协作开发', '代码质量', '项目落地'],
    memory: '您把一个个需求、模块和细节串起来，让同学们看见工程真正运行的样子。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
  {
    id: 'auto',
    name: '智控星',
    color: '#fca5a5',
    group: '无需提前收集名单',
    x: 20,
    y: 66,
    glow: 0.92,
    keywords: ['感知世界', '控制之美', '实验精神', '持续探索'],
    memory: '您让传感、控制和智能系统拥有了清楚的方向，也让同学们敢于动手验证想法。',
    wishes: [
      '不需要提前征集，扫码后即可生成专属祝福。',
      '老师输入姓名，选择星宿，就能保存自己的电子贺卡。',
      '学生现场补一句话，也可以让祝福更贴近本人。',
    ],
  },
];

const ambientStars = [
  [10, 24, 0.6],
  [24, 27, 0.9],
  [45, 28, 0.7],
  [67, 24, 0.8],
  [88, 29, 0.55],
  [9, 54, 0.75],
  [28, 56, 0.5],
  [47, 59, 0.95],
  [58, 54, 0.6],
  [90, 72, 0.86],
  [12, 80, 0.66],
  [30, 82, 0.58],
  [52, 84, 0.76],
  [75, 79, 0.62],
] as const;

const constellationShapes = {
  chen: {
    points: [[12, 30], [22, 18], [34, 22], [44, 12], [54, 24], [47, 38], [30, 40]],
    paths: [[0, 1, 2, 3, 4], [2, 5, 6, 0]],
  },
  zhang: {
    points: [[10, 22], [22, 18], [31, 30], [43, 26], [56, 34], [45, 42]],
    paths: [[0, 1, 2, 3, 4], [3, 5]],
  },
  lin: {
    points: [[16, 18], [30, 14], [45, 19], [52, 34], [38, 42], [22, 36]],
    paths: [[0, 1, 2, 3, 4, 5, 0]],
  },
  wang: {
    points: [[12, 36], [24, 24], [36, 29], [46, 14], [58, 22], [50, 38], [34, 43]],
    paths: [[0, 1, 2, 3, 4], [2, 5, 6]],
  },
  li: {
    points: [[15, 16], [27, 27], [20, 42], [38, 38], [50, 26], [58, 39]],
    paths: [[0, 1, 2, 3, 4, 5], [1, 4]],
  },
  math: {
    points: [[12, 24], [26, 14], [40, 18], [55, 28], [42, 40], [24, 38]],
    paths: [[0, 1, 2, 3], [1, 5, 4, 3]],
  },
  software: {
    points: [[10, 32], [22, 18], [36, 16], [52, 24], [58, 38], [42, 44], [25, 41]],
    paths: [[0, 1, 2, 3, 4, 5, 6, 0], [2, 5]],
  },
  auto: {
    points: [[12, 20], [25, 30], [39, 21], [54, 30], [46, 43], [28, 42]],
    paths: [[0, 1, 2, 3], [1, 5, 4, 3]],
  },
} as const;

function ConstellationMark({ id }: { id: keyof typeof constellationShapes }) {
  const shape = constellationShapes[id];
  return (
    <svg className="constellation-mark" viewBox="0 0 70 56" aria-hidden="true">
      {shape.paths.map((path, index) => (
        <polyline
          key={index}
          points={path.map((pointIndex) => shape.points[pointIndex].join(',')).join(' ')}
          fill="none"
        />
      ))}
      {shape.points.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index === 0 ? 3.6 : 2.6} />
      ))}
    </svg>
  );
}

function constellationCardMarkup(id: keyof typeof constellationShapes, color: string) {
  const shape = constellationShapes[id];
  const lines = shape.paths
    .map((path) => `<polyline points="${path.map((pointIndex) => shape.points[pointIndex].join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".86"/>`)
    .join('');
  const points = shape.points
    .map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="${index === 0 ? 7 : 5}" fill="#fff8d7" stroke="${color}" stroke-width="3"/>`)
    .join('');
  return `<g transform="translate(760 525) scale(2.2)">${lines}${points}</g>`;
}

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

async function loadImageDataUri(src: string) {
  const response = await fetch(src);
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [style, setStyle] = useState<keyof typeof styles>('真诚版');
  const [studentLine, setStudentLine] = useState('不用提前收集寄语，也想把同学们共同的感谢送到您身边。');
  const [teacherName, setTeacherName] = useState('老师');
  const [notice, setNotice] = useState('');
  const activeId = hoveredId ?? selectedId;
  const activeTeacher = teachers.find((teacher) => teacher.id === activeId) ?? null;
  const selected = activeTeacher ?? teachers[0];
  const displayName = teacherName.trim() || '老师';

  const generatedGreeting = useMemo(() => {
    const seed = styles[style];
    return `${displayName}，教师节快乐！${seed} ${selected.memory} ${studentLine.trim()}`;
  }, [style, studentLine, displayName, selected.memory]);

  const downloadCard = async () => {
    const nbuLogo = await loadImageDataUri('/brand/nbu-logo.png');
    const aiLogo = await loadImageDataUri('/brand/ai-logo.png');
    const safeName = escapeXml(displayName);
    const safeTitle = escapeXml(selected.name);
    const safeGreeting = escapeXml(`愿每一次授课都被记得，每一份耐心都被看见。教师节快乐！`);
    const starColor = selected.color;
    const constellation = constellationCardMarkup(selected.id as keyof typeof constellationShapes, starColor);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#07172d"/>
          <stop offset="58%" stop-color="#0d7897"/>
          <stop offset="100%" stop-color="#fff3c0"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${starColor}" stop-opacity=".42"/>
          <stop offset="100%" stop-color="${starColor}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1080" height="1440" fill="url(#bg)"/>
      <circle cx="840" cy="600" r="230" fill="url(#glow)"/>
      <circle cx="880" cy="180" r="210" fill="#f6d784" opacity=".14"/>
      <circle cx="180" cy="1160" r="280" fill="#78d9ff" opacity=".11"/>
      <rect x="72" y="70" width="936" height="155" rx="28" fill="#ffffff" opacity=".1" stroke="#ffffff" stroke-opacity=".18"/>
      <circle cx="152" cy="147" r="52" fill="#ffffff" stroke="#ffffff" stroke-opacity=".88"/>
      <circle cx="274" cy="147" r="52" fill="#ffffff" stroke="#ffffff" stroke-opacity=".88"/>
      <image href="${nbuLogo}" x="108" y="103" width="88" height="88"/>
      <image href="${aiLogo}" x="230" y="103" width="88" height="88"/>
      <text x="368" y="145" fill="#ffe9a8" font-size="36" font-family="Microsoft YaHei, Arial" font-weight="700">宁波大学人工智能学院</text>
      <text x="368" y="190" fill="#d6f5ff" font-size="22" font-family="Microsoft YaHei, Arial">School of Artificial Intelligence, Ningbo University</text>
      <text x="90" y="445" fill="#ffffff" font-size="58" font-family="Microsoft YaHei, Arial" font-weight="700">师恩如星，智启未来</text>
      ${constellation}
      <text x="90" y="570" fill="#d6f5ff" font-size="34" font-family="Microsoft YaHei, Arial">献给</text>
      <text x="90" y="685" fill="#ffe9a8" font-size="96" font-family="Microsoft YaHei, Arial" font-weight="800">${safeName}</text>
      <text x="90" y="755" fill="${starColor}" font-size="38" font-family="Microsoft YaHei, Arial" font-weight="700">${safeTitle}</text>
      <rect x="90" y="850" width="900" height="310" rx="18" fill="#ffffff" opacity=".94"/>
      <rect x="90" y="850" width="900" height="12" rx="6" fill="${starColor}" opacity=".92"/>
      <text x="140" y="930" fill="#10233b" font-size="42" font-family="Microsoft YaHei, Arial" font-weight="700">教师节快乐</text>
      <foreignObject x="140" y="965" width="800" height="150">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:32px;line-height:1.65;color:#40536a;font-family:'Microsoft YaHei',Arial;word-break:break-all;">${safeGreeting}</div>
      </foreignObject>
      <text x="90" y="1270" fill="#fff5cf" font-size="28" font-family="Microsoft YaHei, Arial">2026 教师节谢师星图</text>
    </svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${displayName}-教师节贺卡.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setNotice('贺卡已生成下载');
  };

  const shareGreeting = async () => {
    const text = `${displayName}的教师节谢师星图：${generatedGreeting}`;
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
                selectedTeacherName: displayName,
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
  }, [displayName, selectedId]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#07172d] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(36,157,201,.38),transparent_32%),radial-gradient(circle_at_78%_28%,rgba(246,192,80,.18),transparent_28%),linear-gradient(135deg,#07172d_0%,#092c49_48%,#123e55_100%)]" />
      <div className="stars-layer" />

      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-3">
          <div className="brand-mark-row">
            <div className="logo-seal" aria-label="宁波大学校徽">
              <img src="/brand/nbu-logo.png" alt="宁波大学校徽" />
            </div>
            <div className="ai-logo-seal" aria-label="宁波大学人工智能学院logo">
              <img src="/brand/ai-logo.png" alt="宁波大学人工智能学院logo" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-wide text-[#f6d784]">宁波大学</p>
            <p className="truncate text-xs text-cyan-100/80 sm:text-sm">人工智能学院教师节献礼</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-2 text-sm text-cyan-50 shadow-sm backdrop-blur md:flex">
          <BrainCircuit className="h-4 w-4 text-[#f6d784]" />
          扫码生成专属贺卡
        </div>
      </header>

      <section className="relative z-10 grid min-h-[calc(100vh-76px)] gap-5 px-5 pb-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-12">
        <div className="relative min-h-[560px] overflow-hidden rounded-[8px] border border-white/12 bg-white/[.045] shadow-2xl shadow-black/25 backdrop-blur">
          <div className="absolute left-6 top-6 max-w-[620px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f6d784]/35 bg-[#f6d784]/12 px-3 py-1.5 text-sm text-[#ffe9a8]">
              <Stars className="h-4 w-4" />
              2026 教师节谢师星图
            </div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">师恩如星，智启未来</h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-cyan-50/82">输入姓名，选一颗星宿，生成一张带校徽的教师节贺卡。</p>
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
            {ambientStars.map(([x, y, scale], index) => (
              <span
                key={index}
                className="ambient-star"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                }}
              />
            ))}
            {teachers.map((teacher) => (
              <button
                key={teacher.id}
              className={`star-node ${activeId === teacher.id ? 'active' : ''}`}
                style={{
                  left: `${teacher.x}%`,
                  top: `${teacher.y}%`,
                  transform: `translate(-50%, -50%) scale(${teacher.glow})`,
                  '--star-color': teacher.color,
                } as CSSProperties}
                onMouseEnter={() => setHoveredId(teacher.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(teacher.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => {
                  setSelectedId(teacher.id);
                }}
                aria-label={`选择${teacher.name}`}
              >
                <ConstellationMark id={teacher.id as keyof typeof constellationShapes} />
                <strong>{teacher.name}</strong>
              </button>
            ))}
          </div>
        </div>

        <aside className="grid gap-5">
          <section className="star-detail-card rounded-[8px] border border-white/14 bg-white/[.92] p-5 text-[#10233b] shadow-2xl shadow-black/20">
            <div className="mb-5 grid gap-3">
              <Input
                value={teacherName}
                onChange={(event) => setTeacherName(event.target.value)}
                className="h-11 border-[#d8e7ed] bg-white text-base text-[#10233b]"
                aria-label="老师姓名"
              />
              <Tabs value={style} onValueChange={(value) => setStyle(value as keyof typeof styles)}>
                <TabsList className="version-tabs grid h-11 w-full grid-cols-4">
                  {Object.keys(styles).map((item) => (
                    <TabsTrigger key={item} value={item} className="version-tab text-sm">
                      {item}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            {activeTeacher ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">当前星宿</p>
                    <h2 className="mt-1 text-3xl font-semibold">{displayName}</h2>
                    <p className="mt-1 text-sm font-medium" style={{ color: activeTeacher.color }}>
                      {activeTeacher.name}
                    </p>
                  </div>
                  <Sparkles className="h-6 w-6" style={{ color: activeTeacher.color }} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeTeacher.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full px-3 py-1 text-sm text-[#12627f]" style={{ backgroundColor: `${activeTeacher.color}24` }}>
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="greeting-panel mt-5 rounded-[8px] border border-[#d8e7ed] bg-[#f8fcfd] p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0d5b78]">
                    <MessageCircleHeart className="h-4 w-4" />
                    同学们眼中的您
                  </div>
                  <p className="text-base leading-8 text-slate-700">{generatedGreeting}</p>
                </div>
              </>
            ) : (
              <div className="star-detail-empty">
                <Sparkles className="h-6 w-6 text-[#ca941f]" />
                <p>移动到一颗星上，查看对应祝福。</p>
              </div>
            )}

            <Textarea
              value={studentLine}
              onChange={(event) => setStudentLine(event.target.value)}
              className="mt-4 min-h-20 border-[#d8e7ed] bg-white text-[#10233b]"
              aria-label="可选补充一句祝福"
            />
          </section>

          <section className="rounded-[8px] border border-[#f6d784]/24 bg-[#fff9e8] p-5 text-[#15233a] shadow-xl shadow-black/15">
            <div className="teacher-card" style={{ '--card-accent': selected.color } as CSSProperties}>
              <div className="flex items-center gap-3">
                <span className="card-logo-seal">
                  <img src="/brand/nbu-logo.png" alt="宁波大学校徽" />
                </span>
                <span className="card-logo-seal ai">
                  <img src="/brand/ai-logo.png" alt="宁波大学人工智能学院logo" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#7d5a14]">宁波大学人工智能学院</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-slate-500">献给</p>
                <p className="mt-1 text-4xl font-semibold text-[#10233b]">{displayName}</p>
                <p className="mt-2 text-sm font-semibold" style={{ color: selected.color }}>{selected.name}</p>
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

    </main>
  );
}
