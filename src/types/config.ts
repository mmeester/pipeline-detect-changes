export interface ReleaseRule {
  type: string;
  release: string;
}

export interface ProjectConfig {
  releaseRules: ReleaseRule[];
}