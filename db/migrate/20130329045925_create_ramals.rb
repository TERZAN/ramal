class CreateRamals < ActiveRecord::Migration
  def change
    create_table :ramals do |t|
      t.string :number
      t.string :name
      t.string :local
      
      t.timestamps
    end
  end
end
