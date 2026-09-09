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

async function loadCanvasImage(src: string) {
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('校徽图片加载失败，请刷新后重试。'));
    image.src = src;
  });
}

function drawRoundImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  size: number,
) {
  context.save();
  context.beginPath();
  context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  context.clip();
  context.drawImage(image, x, y, size, size);
  context.restore();
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const chars = Array.from(text);
  let line = '';
  let currentY = y;
  let lines = 0;

  for (const char of chars) {
    const testLine = `${line}${char}`;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = char;
      currentY += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) {
        break;
      }
    } else {
      line = testLine;
    }
  }

  if (line && lines < maxLines) {
    context.fillText(line, x, currentY);
  }
}

function drawConstellationCanvas(
  context: CanvasRenderingContext2D,
  id: keyof typeof constellationShapes,
  color: string,
  offsetX: number,
  offsetY: number,
  scale: number,
) {
  const shape = constellationShapes[id];
  context.save();
  context.translate(offsetX, offsetY);
  context.scale(scale, scale);
  context.lineWidth = 4;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = color;
  context.globalAlpha = 0.86;
  for (const path of shape.paths) {
    context.beginPath();
    path.forEach((pointIndex, index) => {
      const [x, y] = shape.points[pointIndex];
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();
  }
  context.globalAlpha = 1;
  for (const [index, [x, y]] of shape.points.entries()) {
    context.beginPath();
    context.arc(x, y, index === 0 ? 7 : 5, 0, Math.PI * 2);
    context.fillStyle = '#fff8d7';
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = color;
    context.stroke();
  }
  context.restore();
}

async function downloadCanvasAsPng(canvas: HTMLCanvasElement, fileName: string) {
  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('PNG 贺卡生成失败，请稍后重试。'));
      }
    }, 'image/png');
  });

  const pngUrl = URL.createObjectURL(pngBlob);
  const link = document.createElement('a');
  link.href = pngUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(pngUrl);
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
    setNotice('正在生成 PNG 贺卡...');
    try {
      const [nbuLogo, aiLogo] = await Promise.all([
        loadCanvasImage('/brand/nbu-logo.png'),
        loadCanvasImage('/brand/ai-logo.png'),
      ]);
      const starColor = selected.color;
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1440;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('当前浏览器不支持图片生成。');
      }

      const background = context.createLinearGradient(0, 0, 1080, 1440);
      background.addColorStop(0, '#07172d');
      background.addColorStop(0.58, '#0d7897');
      background.addColorStop(1, '#fff3c0');
      context.fillStyle = background;
      context.fillRect(0, 0, 1080, 1440);

      const glow = context.createRadialGradient(840, 600, 10, 840, 600, 230);
      glow.addColorStop(0, `${starColor}70`);
      glow.addColorStop(1, `${starColor}00`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(840, 600, 230, 0, Math.PI * 2);
      context.fill();

      context.globalAlpha = 0.14;
      context.fillStyle = '#f6d784';
      context.beginPath();
      context.arc(880, 180, 210, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 0.11;
      context.fillStyle = '#78d9ff';
      context.beginPath();
      context.arc(180, 1160, 280, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;

      context.strokeStyle = 'rgba(255,255,255,.18)';
      context.fillStyle = 'rgba(255,255,255,.1)';
      context.lineWidth = 2;
      context.roundRect(72, 70, 936, 155, 28);
      context.fill();
      context.stroke();

      for (const [x, image] of [[108, nbuLogo], [230, aiLogo]] as const) {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.arc(x + 44, 147, 52, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = 'rgba(255,255,255,.88)';
        context.stroke();
        drawRoundImage(context, image, x, 103, 88);
      }

      context.fillStyle = '#ffe9a8';
      context.font = '700 36px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('宁波大学人工智能学院', 368, 145);
      context.fillStyle = '#d6f5ff';
      context.font = '400 22px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('School of Artificial Intelligence, Ningbo University', 368, 190);

      context.fillStyle = '#ffffff';
      context.font = '700 58px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('师恩如星，智启未来', 90, 445);
      drawConstellationCanvas(context, selected.id as keyof typeof constellationShapes, starColor, 760, 525, 2.2);

      context.fillStyle = '#d6f5ff';
      context.font = '400 34px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('献给', 90, 570);
      context.fillStyle = '#ffe9a8';
      context.font = '800 96px "Microsoft YaHei", Arial, sans-serif';
      context.fillText(displayName, 90, 685);
      context.fillStyle = starColor;
      context.font = '700 38px "Microsoft YaHei", Arial, sans-serif';
      context.fillText(selected.name, 90, 755);

      context.fillStyle = 'rgba(255,255,255,.94)';
      context.roundRect(90, 850, 900, 310, 18);
      context.fill();
      context.fillStyle = starColor;
      context.globalAlpha = 0.92;
      context.roundRect(90, 850, 900, 12, 6);
      context.fill();
      context.globalAlpha = 1;

      context.fillStyle = '#10233b';
      context.font = '700 42px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('教师节快乐', 140, 930);
      context.fillStyle = '#40536a';
      context.font = '400 32px "Microsoft YaHei", Arial, sans-serif';
      drawWrappedText(context, '愿每一次授课都被记得，每一份耐心都被看见。教师节快乐！', 140, 1005, 800, 52, 3);

      context.fillStyle = '#fff5cf';
      context.font = '400 28px "Microsoft YaHei", Arial, sans-serif';
      context.fillText('2026 教师节谢师星图', 90, 1270);

      await downloadCanvasAsPng(canvas, `${displayName}-教师节贺卡.png`);
      setNotice('PNG 贺卡已生成下载');
    } catch (error) {
      console.error(error);
      setNotice(error instanceof Error ? error.message : '贺卡生成失败，请稍后重试。');
    }
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
