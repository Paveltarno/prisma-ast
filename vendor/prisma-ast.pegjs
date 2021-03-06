buildTree = 
  nodes:modelDef* { return({ type: 'ast', nodes }) }

blockStart = s* "{" s*
blockEnd = s* "}" s*

modelFieldsBlock
	= blockStart fields:modelFieldRow+ blockEnd { return(fields) }

modelFieldRow
	= s* name:modelFieldName ws* modelFieldType:modelFieldType eol { return({name, ...modelFieldType}) }
    
modelFieldName "modelFieldName"
	= string
    
modelFieldType
	= modelFieldType:(modelFieldTypePrimitive / modelFieldTypeRelation) 
    isOptional:modelFieldOptional? 
    attributes:modelFieldAttribute*
    { 
      return({
        ...modelFieldType, 
        isOptional: Boolean(isOptional), 
        attributes}) 
    }
    
modelFieldAttribute "modelFieldAttributeValue"
	= ws "@" value:string { return({type: 'attribute', value} ) }
    
modelFieldOptional
	= "?"
    
modelFieldHasMany
	= "[]"

modelFieldTypePrimitive
 = fieldType:("Int" / "String" / "Boolean") { return({type: 'modeFieldPrimitive', fieldType}) }
 
modelFieldTypeRelation "relationFieldName"
 = fieldType:modelFieldRelationName hasMany:modelFieldHasMany? { return({type: 'modelFieldRelation', fieldType, hasMany: Boolean(hasMany)}) }

modelFieldRelationName "modelFieldRelationName"
	= string

modelDef
  = "model" s modelName:modelName fields:modelFieldsBlock { return({type: 'model', name: modelName, fields }) }

modelName "modelName"
  = string

string
  = $ [a-zA-Z0-9]+

s "whitespace/EOL"
  = [ \t\r\n\f]+
  
ws "whitespace"
  = [ \t\r\f]+
  
eol
  = [\n]+
