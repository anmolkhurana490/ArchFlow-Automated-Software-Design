"use client";

import { useDesignStudioViewModel } from "@/features/design_studio/viewmodel/DesignStudioViewModel";
import { useDesignStudioStore } from "@/features/design_studio/viewmodel/DesignStudioStore";
import { useShallow } from "zustand/react/shallow";
import type { StageStatus } from "../../../model/types";
import { StagePanelFrame } from "./StagePanelFrame";
import Markdown from "react-markdown";
import { useParams } from "next/navigation";

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
          onClick={exportMarkdown}
          className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200 hover:border-cyan-400"
        >
          Export Markdown
        </button>
        <button
          type="button"
          onClick={exportPDF}
          className="rounded-md border border-slate-600 bg-cyan-700 px-3 py-1 text-sm font-medium text-white hover:bg-cyan-600"
        >
          Export PDF
        </button>
      </div>}

      {validation?.final_score && <p className="text-sm text-slate-300">
        Final output compiled after validation confidence {Math.round(validation.final_score * 100)}/100.
      </p>}

      {/* <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-100">
      </pre> */}
      <div className="prose prose-sm prose-invert prose-h2:border-b prose-h2:border-gray-500 max-w-none">
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
