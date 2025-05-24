interface HtmlAttributes {
  id: string;
  name: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type HtmlCreationAttributes = Optional<HtmlAttributes, 'id' | 'createdAt' | 'updatedAt'>;
