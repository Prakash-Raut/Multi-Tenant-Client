export interface Tenant {
  id: number;
  name: string;
  address: string;
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface ProductAttribute {
  name: string;
  value: string | boolean;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  tenantId: string;
  categoryId: string;
  category: Category;
  isPublish: boolean;
}

export interface Topping {
  _id: string;
  name: string;
  image: string;
  price: number;
  tenantId: string;
  isPublish: boolean;
}
