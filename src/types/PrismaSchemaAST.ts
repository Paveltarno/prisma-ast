export enum PrismaSchemaASTTypes {
  AST = 'ast',
  MODEL = 'model',
  ATTRIBUTE = 'attribute',
  MODEL_FIELD_PRIMITIVE = 'modeFieldPrimitive',
  MODEL_FIELD_RELATION = 'modelFieldRelation',
}

export interface IPrismaSchemaASTNode {
  type: string
}

export interface IPrismaSchemaAST extends IPrismaSchemaASTNode {
  type: PrismaSchemaASTTypes.AST
  nodes: IPrismaSchemaASTNode[]
}

export interface IPrismaSchemaASTModel extends IPrismaSchemaASTNode {
  type: PrismaSchemaASTTypes.MODEL
  name: string
  fields: IPrismaSchemaASTModelField[]
}

export interface IPrismaSchemaASTModelField extends IPrismaSchemaASTNode {
  name: string
  fieldType: string
  isOptional: boolean
  attributes: IPrismaSchemaASTModelFieldAttribute[]
}

export interface IPrismaSchemaASTModelFieldAttribute
  extends IPrismaSchemaASTNode {
  type: PrismaSchemaASTTypes.ATTRIBUTE
  value: string
}

export interface IPrismaSchemaASTModelFieldPrimitive
  extends IPrismaSchemaASTModelField {
  type: PrismaSchemaASTTypes.MODEL_FIELD_PRIMITIVE
}

export interface IPrismaSchemaASTModelFieldRelation
  extends IPrismaSchemaASTModelField {
  type: PrismaSchemaASTTypes.MODEL_FIELD_RELATION
  hasMany: boolean
}
