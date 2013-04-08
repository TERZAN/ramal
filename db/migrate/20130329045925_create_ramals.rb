class CreateRamals < ActiveRecord::Migration
  def change
    create_table :ramals do |t|
      t.string :local
      t.string :number
      t.string :name
      
      t.timestamps
    end
  end
end
