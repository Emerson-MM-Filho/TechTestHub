'use client';
import { useContext } from "react";

import { CompanyContext } from "@/contexts/CompanyContext";
import Position from '@/components/position';


const PositionsCurrents = () => {

    const { company } = useContext(CompanyContext)

    return (
        <>
            {   
                company.positions?.map(
                    (position) => <Position position={position} key={position.id}/>
                )
            }
        </>
    );
};

export default PositionsCurrents;
