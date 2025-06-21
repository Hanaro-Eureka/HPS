// 'use client';

// import * as d3 from 'd3';
// // ✅ default import ❌, 반드시 * as d3

// import { useEffect, useRef } from 'react';

// type DataItem = {
//   category: string;
//   amount: number;
// };

// type Props = {
//   data: DataItem[];
// };

// export default function SalaryBubbleChart({ data }: Props) {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!data || !svgRef.current) return;

//     const width = 600;
//     const height = 600;

//     // SVG 초기화
//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove();

//     // 계층 데이터 구성 - 타입 개선 (루트에 amount 없음)
//     const root = d3
//       .hierarchy<Partial<DataItem>>({ children: data })
//       .sum((d) => d.amount ?? 0);

//     // 패킹 레이아웃
//     const pack = d3.pack<Partial<DataItem>>().size([width, height]).padding(10);
//     const nodes = pack(root).leaves();

//     // 색상 스케일
//     const color = d3.scaleOrdinal(d3.schemePastel1);

//     // 원 그리기
//     svg
//       .selectAll('circle')
//       .data(nodes)
//       .enter()
//       .append('circle')
//       .attr('cx', (d) => d.x)
//       .attr('cy', (d) => d.y)
//       .attr('r', (d) => d.r)
//       .attr('fill', (_, i) => color(String(i)))
//       .attr('stroke', '#fff')
//       .attr('stroke-width', 2);

//     // 텍스트 (카테고리)
//     svg
//       .selectAll('text.category')
//       .data(nodes)
//       .enter()
//       .append('text')
//       .attr('class', 'category')
//       .attr('x', (d) => d.x)
//       .attr('y', (d) => d.y - 5)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '12px')
//       .attr('fill', '#333')
//       .text((d) => d.data.category ?? '');

//     // 텍스트 (금액)
//     svg
//       .selectAll('text.amount')
//       .data(nodes)
//       .enter()
//       .append('text')
//       .attr('class', 'amount')
//       .attr('x', (d) => d.x)
//       .attr('y', (d) => d.y + 12)
//       .attr('text-anchor', 'middle')
//       .attr('font-size', '11px')
//       .attr('fill', '#555')
//       .text((d) =>
//         d.data.amount !== undefined ? `${d.data.amount.toLocaleString()}원` : ''
//       );
//   }, [data]);

//   return <svg ref={svgRef} width={600} height={600} />;
// }
