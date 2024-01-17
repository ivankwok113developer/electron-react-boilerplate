class Block:
  def __init__(self,name,inputs,outputs,parameters,script):
    self.id=0 #give it a unique id
    self.name=name
    self.parameters=parameters #dictionary
    self.inputs=inputs
    self.outputs=outputs
    self.script=script

  def setInput(self,_inputs):
    self.inputs=_inputs
    pass

  def runScript():
    pass

  def checkTrigger():
    pass
    # if xxxx is true return true

if __name__=="__main__":
  testingBlock=Block("testing")
  print(testingBlock.inputs.kk)