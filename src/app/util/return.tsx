import React from 'react';
import { useRouter } from "next/navigation";
import {Button} from 'antd'

const returnDiv: React.FC = () => {
    const router = useRouter();
    const handleReturn = () => {
        localStorage.clear();
        router.push("/");
      };
    

  return (
    <div>
       <Button type="primary" onClick={handleReturn}>
          return
        </Button>
    </div>
  );
};

export default returnDiv;