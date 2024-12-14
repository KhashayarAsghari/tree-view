export interface TreeNodeType { 
    id: string;
    title: string; 
    color?: string;
    children?: TreeNodeType[]; 
}