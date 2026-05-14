"use client";

import { useDesignStudioViewModel } from "@/features/design_studio/viewmodel/DesignStudioViewModel";
import { useDesignStudioStore } from "@/shared/stores/DesignStudioStore";
import { useShallow } from "zustand/react/shallow";
import type { StageStatus } from "../../../model/types";
import { StagePanelFrame } from "./StagePanelFrame";
import Markdown from "react-markdown";
import { useParams } from "next/navigation";
import { useState } from "react";

interface FinalOutputStagePanelProps {
  status: StageStatus;
}

function FinalOutputStageContent() {
  const params = useParams();
  const projectId = params.id as string;

  const { validation, finalOutput } = useDesignStudioStore(
    useShallow((state) => ({
      validation: state.validation,
      finalOutput: state.output,
    })),
  );

  const {
    exportMarkdown, exportPDF
  } = useDesignStudioViewModel(projectId);

  const [exportingMarkdown, setExportingMarkdown] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  const handleExportMarkdown = async () => {
    if (exportingMarkdown || exportingPDF) return;
    setExportingMarkdown(true);
    try {
      await exportMarkdown();
    } finally {
      setExportingMarkdown(false);
    }
  };

  const handleExportPDF = async () => {
    if (exportingMarkdown || exportingPDF) return;
    setExportingPDF(true);
    try {
      await exportPDF();
    } finally {
      setExportingPDF(false);
    }
  };

  if (!finalOutput) {
    return (
      <p>Section details will appear once output generation is done.</p>
    );
  }

  return (
    <div className="space-y-4">
      {finalOutput && <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={handleExportMarkdown}
          disabled={exportingMarkdown || exportingPDF}
          className="inline-flex items-center gap-2 rounded-md border border-slate-600 bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200 hover:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exportingMarkdown ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyan-200 border-t-transparent" /> : null}
          Export Markdown
        </button>
        <button
          type="button"
          onClick={handleExportPDF}
          disabled={exportingMarkdown || exportingPDF}
          className="inline-flex items-center gap-2 rounded-md border border-slate-600 bg-cyan-700 px-3 py-1 text-sm font-medium text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exportingPDF ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-cyan-100 border-t-transparent" /> : null}
          Export PDF
        </button>
      </div>}

      {validation?.final_score && <p className="text-sm text-slate-300">
        Final output compiled with Scoring {Math.round(validation.final_score * 100)}/100.
      </p>}

      {/* <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-100">
      </pre> */}
      <div className="prose prose-sm prose-invert prose-h2:border-b prose-h2:border-gray-500 wrap-break-word">
        <Markdown>
          {finalOutput.final_output_report}
        </Markdown>
      </div>
    </div>
  );
}

export function FinalOutputStagePanel({ status }: FinalOutputStagePanelProps) {
  const isLive = useDesignStudioStore((state) => state.isLive);

  return (
    <StagePanelFrame
      stage="output"
      status={status}
      title="Final Output"
      subtitle="Compile all stage outputs into the final architecture document."
      isLive={isLive("output")}
      StageContent={FinalOutputStageContent}
    />
  );
}
