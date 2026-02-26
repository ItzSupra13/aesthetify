"use client";

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown } from "lucide-react";
import { memo, useCallback, useState } from "react";

import { MODELS } from "@/lib/constants";

interface ModelItemProps {
  model: (typeof MODELS)[0];
  selectedModel: string;
  onSelect: (id: string) => void;
}

const ModelItem = memo(({ model, selectedModel, onSelect }: ModelItemProps) => {
  const handleSelect = useCallback(
    () => onSelect(model.id),
    [onSelect, model.id]
  );
  return (
    <ModelSelectorItem key={model.id} onSelect={handleSelect} value={model.id}>
      <ModelSelectorLogo provider={model.chefSlug} />
      <ModelSelectorName>{model.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {model.providers.map((provider) => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {selectedModel === model.id ? (
        <CheckIcon className="ml-auto size-4" />
      ) : (
        <div className="ml-auto size-4" />
      )}
    </ModelSelectorItem>
  );
});

ModelItem.displayName = "ModelItem";

export function Modelitem() {
  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");

  const handleModelSelect = useCallback((id: string) => {
    setSelectedModel(id);
    setOpen(false);
  }, []);

  const selectedModelData = MODELS.find((model) => model.id === selectedModel);

  // Get unique chefs in order of appearance
  const chefs = [...new Set(MODELS.map((model) => model.chef))];

  return (
    <div className="flex items-center gap-1 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors">
      <ModelSelector onOpenChange={setOpen} open={open}>
              <ModelSelectorTrigger asChild>
                  <Button className="w-[180px] justify-between rounded-4xl" variant="outline">
                    <ChevronDown className="h-4 w-4 mt-0.5 text-primary justify-between"/>
            {selectedModelData?.chefSlug && (
              <ModelSelectorLogo provider={selectedModelData.chefSlug} />
            )}
            {selectedModelData?.name && (
              <ModelSelectorName>{selectedModelData.name}</ModelSelectorName>
            )}
          </Button>
        </ModelSelectorTrigger>
        <ModelSelectorContent>
          <ModelSelectorInput placeholder="Search models..." />
          <ModelSelectorList>
            <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
            {chefs.map((chef) => (
              <ModelSelectorGroup heading={chef} key={chef}>
                {MODELS
                  .filter((model) => model.chef === chef)
                  .map((model) => (
                    <ModelItem
                      key={model.id}
                      model={model}
                      onSelect={handleModelSelect}
                      selectedModel={selectedModel}
                    />
                  ))}
              </ModelSelectorGroup>
            ))}
          </ModelSelectorList>
        </ModelSelectorContent>
      </ModelSelector>
    </div>
  );
};
